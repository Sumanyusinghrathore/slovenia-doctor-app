import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import { patientApi } from '../../../services/patientApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

/* ─────────────────────────────────────────────
   Animated typing dots
───────────────────────────────────────────── */
const TypingIndicator = () => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const anims = dots.map((dot, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 140),
          Animated.timing(dot, { toValue: -5, duration: 280, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0,  duration: 280, useNativeDriver: true }),
          Animated.delay(560),
        ]),
      ),
    );
    Animated.parallel(anims).start();
    return () => anims.forEach(a => a.stop());
  }, []);

  return (
    <View style={styles.typingRow}>
      <View style={styles.aiBadge}>
        <Text style={styles.aiBadgeText}>AI</Text>
      </View>
      <View style={styles.typingBubble}>
        {dots.map((dot, i) => (
          <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]} />
        ))}
      </View>
    </View>
  );
};

/* ─────────────────────────────────────────────
   Suggestion chip
───────────────────────────────────────────── */
interface ChipProps {
  icon: string;
  label: string;
  onPress: () => void;
}
const SuggestionChip = ({ icon, label, onPress }: ChipProps) => (
  <TouchableOpacity style={styles.chip} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.chipIcon}>{icon}</Text>
    <Text style={styles.chipLabel}>{label}</Text>
  </TouchableOpacity>
);

/* ─────────────────────────────────────────────
   Main screen
───────────────────────────────────────────── */
const AIChatScreen = () => {
  const navigation      = useNavigation<any>();
  const flatListRef     = useRef<FlatList>(null);
  const inputAnim       = useRef(new Animated.Value(0)).current;
  const chatHistoryRef  = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'नमस्ते! 👋 मैं Slota AI हूँ, आपका AI स्वास्थ्य सहायक। आप मुझसे कोई भी स्वास्थ्य संबंधी प्रश्न पूछ सकते हैं।',
      sender: 'ai',
      timestamp: '11:00 AM',
    },
  ]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading]         = useState(false);

  /* ── Input focus animation ── */
  const onFocus = () =>
    Animated.spring(inputAnim, { toValue: 1, useNativeDriver: false, speed: 20 }).start();
  const onBlur  = () =>
    Animated.spring(inputAnim, { toValue: 0, useNativeDriver: false, speed: 20 }).start();

  const inputBorderColor   = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E8EDF5', COLORS.primary],
  });
  const inputShadowOpacity = inputAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.04, 0.14],
  });

  /* ── AI API ── */
  const getAIResponse = async (message: string): Promise<string> => {
    try {
      chatHistoryRef.current = [...chatHistoryRef.current, { role: 'user', content: message }];
      const reply = await patientApi.askAi(chatHistoryRef.current);

      chatHistoryRef.current = [...chatHistoryRef.current, { role: 'assistant', content: reply }];
      return reply;
    } catch (error: any) {
      if (error?.name === 'AbortError') return 'Request timed out. Please try again.';
      console.error('AI ERROR:', error);
      return 'मुझे तकनीकी समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।';
    }
  };

  /* ── Send ── */
  const sendMessage = async () => {
    if (!messageText.trim() || loading) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      sender: 'user',
      timestamp: now,
    };

    setMessages(prev => [...prev, userMsg]);
    const text = messageText.trim();
    setMessageText('');
    setLoading(true);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);

    const reply = await getAIResponse(text);
    setLoading(false);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString() + '_ai',
        text: reply,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 80);
  };

  /* ── Message bubble ── */
  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.msgRow, isUser ? styles.msgRowUser : styles.msgRowAI]}>
        {!isUser && (
          <View style={styles.aiBadge}>
            <Text style={styles.aiBadgeText}>AI</Text>
          </View>
        )}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
          <Text style={[styles.bubbleText, { color: isUser ? '#fff' : '#1C2333' }]}>
            {item.text}
          </Text>
          <Text style={[styles.bubbleTime, { color: isUser ? 'rgba(255,255,255,0.55)' : '#9BA5B7' }]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  const SUGGESTIONS = [
    { icon: '🤒', label: 'Fever tips' },
    { icon: '💊', label: 'Blood pressure' },
    { icon: '🥗', label: 'Diet advice' },
    { icon: '🧠', label: 'सिरदर्द' },
  ];

  /* ── Render ── */
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#3D4A63" />
          </TouchableOpacity>

          <View style={styles.headerMeta}>
            <LinearGradient
              colors={[COLORS.primary + 'DD', COLORS.primary]}
              style={styles.headerAvatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={{ fontSize: 18 }}>🤖</Text>
            </LinearGradient>

            <View>
              <Text style={styles.headerName}>Slota AI</Text>
              <View style={styles.onlineRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineLabel}>Healthcare Assistant</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.infoBtn} activeOpacity={0.7}>
            <Ionicons name="information-circle-outline" size={22} color="#9BA5B7" />
          </TouchableOpacity>
        </View>

        {/* ── CHAT ── */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={loading ? <TypingIndicator /> : null}
          ListHeaderComponent={
            <View style={styles.dateBadgeWrap}>
              <View style={styles.dateBadge}>
                <Text style={styles.dateBadgeText}>Today</Text>
              </View>
            </View>
          }
        />

        {/* ── SUGGESTIONS ── */}
        {messages.length === 1 && !loading && (
          <View style={styles.suggestionsWrap}>
            <Text style={styles.suggestLabel}>Quick questions</Text>
            <View style={styles.chipsRow}>
              {SUGGESTIONS.map(s => (
                <SuggestionChip
                  key={s.label}
                  icon={s.icon}
                  label={s.label}
                  onPress={() => setMessageText(s.label)}
                />
              ))}
            </View>
          </View>
        )}

        {/* ── INPUT BAR ── */}
        <View style={styles.inputWrapper}>
          <Animated.View
            style={[
              styles.inputBox,
              { borderColor: inputBorderColor, shadowOpacity: inputShadowOpacity },
            ]}
          >
            <TextInput
              style={styles.input}
              placeholder="Ask a health question…"
              placeholderTextColor="#B0BAC8"
              value={messageText}
              onChangeText={setMessageText}
              onFocus={onFocus}
              onBlur={onBlur}
              multiline
              maxLength={500}
            />

            <TouchableOpacity
              style={[styles.sendBtn, (!messageText.trim() || loading) && styles.sendBtnDisabled]}
              onPress={sendMessage}
              disabled={!messageText.trim() || loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator size="small" color="#fff" />
                : <Ionicons name="arrow-up" size={18} color="#fff" />
              }
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.disclaimer}>Not a substitute for professional medical advice</Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIChatScreen;

/* ─────────────────────────────────────────────
   Styles
───────────────────────────────────────────── */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },

  /* ── Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ECEEF4',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#F4F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  headerMeta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1C2333',
    letterSpacing: 0.1,
  },
  onlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
  },
  onlineLabel: {
    fontSize: 12,
    color: '#6B7A99',
  },
  infoBtn: {
    padding: 4,
  },

  /* ── Chat list ── */
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  dateBadgeWrap: {
    alignItems: 'center',
    marginVertical: 16,
  },
  dateBadge: {
    backgroundColor: '#E8EDF5',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  dateBadgeText: {
    fontSize: 12,
    color: '#7A86A0',
    fontWeight: '500',
  },

  /* ── Message rows ── */
  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  msgRowUser: {
    justifyContent: 'flex-end',
  },
  msgRowAI: {
    justifyContent: 'flex-start',
    gap: 8,
  },

  /* AI badge (replaces emoji avatar) */
  aiBadge: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },

  /* ── Bubbles ── */
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: SCREEN_WIDTH * 0.72,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 5,
  },
  bubbleAI: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#ECEEF4',
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 21,
  },
  bubbleTime: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'right',
  },

  /* ── Typing indicator ── */
  typingRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 10,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#ECEEF4',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#B0BAC8',
  },

  /* ── Suggestion chips ── */
  suggestionsWrap: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  suggestLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9BA5B7',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E5F0',
  },
  chipIcon: {
    fontSize: 14,
  },
  chipLabel: {
    fontSize: 13,
    color: '#3D4A63',
    fontWeight: '500',
  },

  /* ── Input bar ── */
  inputWrapper: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 12,
    backgroundColor: '#F4F6FB',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 22,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1C2333',
    maxHeight: 110,
    paddingTop: Platform.OS === 'ios' ? 6 : 4,
    paddingBottom: 6,
    lineHeight: 20,
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 2,
  },
  sendBtnDisabled: {
    backgroundColor: '#D1D8E8',
  },
  disclaimer: {
    fontSize: 10,
    color: '#B0BAC8',
    textAlign: 'center',
    marginTop: 6,
    letterSpacing: 0.2,
  },
});
