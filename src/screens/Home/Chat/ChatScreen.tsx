import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import { patientApi } from '../../../services/patientApi';

/* MOCK MESSAGES */
const MOCK_MESSAGES = [
  {
    id: '1',
    text: 'Hi! How are you feeling today?',
    sender: 'doctor',
    timestamp: '10:15 AM',
    read: true,
  },
  {
    id: '2',
    text: "I'm doing well, just some mild chest discomfort",
    sender: 'user',
    timestamp: '10:16 AM',
    read: true,
  },
  {
    id: '3',
    text: 'Have you been taking your medication regularly?',
    sender: 'doctor',
    timestamp: '10:17 AM',
    read: true,
  },
  {
    id: '4',
    text: 'Yes, every morning as prescribed',
    sender: 'user',
    timestamp: '10:18 AM',
    read: true,
  },
  {
    id: '5',
    text: 'Good! Please monitor your symptoms and schedule a follow-up appointment. I recommend you come in next week for an ECG.',
    sender: 'doctor',
    timestamp: '10:19 AM',
    read: true,
  },
  {
    id: '6',
    text: 'Sure, I will book an appointment. Thank you doctor!',
    sender: 'user',
    timestamp: '10:20 AM',
    read: true,
  },
  {
    id: '7',
    text: 'Please take the medication as prescribed',
    sender: 'doctor',
    timestamp: '10:30 AM',
    read: false,
  },
];

const ChatScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const chat = route?.params?.chat;
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [messageText, setMessageText] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [isLoadingReply, setIsLoadingReply] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Get AI Response from Slota AI API
  const getAIResponse = async (userMessage: string) => {
    try {
      setIsLoadingReply(true);
      return await patientApi.askAi([
        {
          role: 'user',
          content: userMessage,
        },
      ]);
    } catch (error) {
      console.error('AI API Error:', error);
      return 'I am experiencing technical difficulties. Please try again later.';
    } finally {
      setIsLoadingReply(false);
    }
  };

  const sendMessage = async () => {
    if (messageText.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        text: messageText,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        read: false,
      };
      setMessages([...messages, newMessage]);
      const userMsg = messageText;
      setMessageText('');

      // Get AI reply from Slota AI API
      const aiReply = await getAIResponse(userMsg);
      
      const doctorReply = {
        id: String(messages.length + 2),
        text: aiReply,
        sender: 'doctor',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        read: true,
      };
      setMessages(prev => [...prev, doctorReply]);
    }
  };

  const renderMessage = ({ item }: { item: typeof MOCK_MESSAGES[0] }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.doctorMessageContainer,
        ]}
      >
        {!isUser && (
          <Image
            source={{ uri: chat.avatar }}
            style={styles.messageAvatar}
          />
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.doctorBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isUser ? styles.userText : styles.doctorText,
            ]}
          >
            {item.text}
          </Text>
          <View style={styles.messageFooter}>
            <Label
              labelContent={item.timestamp}
              family={FONTS.AxiformaRegular}
              textStyle={[
                styles.timestamp,
                isUser ? styles.userTimestamp : styles.doctorTimestamp,
              ]}
            />
            {isUser && (
              <Ionicons
                name={item.read ? 'checkmark-done' : 'checkmark'}
                size={12}
                color={item.read ? COLORS.primary : '#A0AEC0'}
                style={styles.readIcon}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  if (!chat) {
    return null;
  }

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={90}
      >
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={28} color={COLORS.black} />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <View style={styles.headerTopRow}>
              <Label
                labelContent={chat.name}
                family={FONTS.AxiformaBold}
                textStyle={styles.chatName}
              />
              {chat.online && (
                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />
                  <Label
                    labelContent="Active now"
                    family={FONTS.AxiformaRegular}
                    textStyle={styles.onlineText}
                  />
                </View>
              )}
            </View>
            <Label
              labelContent={chat.specialty}
              family={FONTS.AxiformaRegular}
              textStyle={styles.headerSubtitle}
            />
          </View>

          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => setShowCallModal(true)}
          >
            <Ionicons name="call-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreBtn}>
            <Ionicons name="ellipsis-vertical" size={24} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.attachBtn}>
              <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>

            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#A0AEC0"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              maxHeight={100}
            />

            <TouchableOpacity
              style={styles.attachBtn}
              onPress={() => console.log('Emoji picker')}
            >
              <Ionicons name="happy-outline" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendBtn,
              (!messageText.trim() || isLoadingReply) && styles.sendBtnDisabled,
            ]}
            onPress={sendMessage}
            disabled={!messageText.trim() || isLoadingReply}
          >
            <Ionicons 
              name={isLoadingReply ? "hourglass" : "send"} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Call Modal */}
      {showCallModal && (
        <View style={styles.callModalOverlay}>
          {!isCalling ? (
            <View style={styles.callModalContent}>
              <TouchableOpacity
                style={styles.closeCallModal}
                onPress={() => setShowCallModal(false)}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={{ uri: chat.avatar }}
                style={styles.callModalAvatar}
              />

              <Label
                labelContent={chat.name}
                family={FONTS.AxiformaBold}
                textStyle={styles.callModalName}
              />
              <Label
                labelContent={chat.specialty}
                family={FONTS.AxiformaRegular}
                textStyle={styles.callModalSpecialty}
              />

              <View style={styles.callTypeButtons}>
                <TouchableOpacity
                  style={styles.callTypeBtn}
                  onPress={() => setIsCalling(true)}
                >
                  <View style={styles.callTypeIconBg}>
                    <Ionicons name="call" size={32} color="#26A69A" />
                  </View>
                  <Label
                    labelContent="Voice Call"
                    family={FONTS.AxiformaSemiBold}
                    textStyle={styles.callTypeText}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.callTypeBtn}
                  onPress={() => setIsCalling(true)}
                >
                  <View style={styles.callTypeIconBg}>
                    <Ionicons name="videocam" size={32} color="#4A90E2" />
                  </View>
                  <Label
                    labelContent="Video Call"
                    family={FONTS.AxiformaSemiBold}
                    textStyle={styles.callTypeText}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.callScreenContent}>
              <TouchableOpacity
                style={styles.callScreenClose}
                onPress={() => {
                  setIsCalling(false);
                  setShowCallModal(false);
                }}
              >
                <Ionicons name="close" size={28} color="#FFFFFF" />
              </TouchableOpacity>

              <Image
                source={{ uri: chat.avatar }}
                style={styles.callScreenAvatar}
              />

              <Label
                labelContent={chat.name}
                family={FONTS.AxiformaBold}
                textStyle={styles.callScreenName}
              />

              <View style={styles.callTimer}>
                <Label
                  labelContent="00:45"
                  family={FONTS.AxiformaBold}
                  textStyle={styles.callTimerText}
                />
              </View>

              <View style={styles.callControls}>
                <TouchableOpacity style={styles.callControlBtn}>
                  <Ionicons name="mic-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.callControlBtn}>
                  <Ionicons name="volume-mute-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.callControlBtn}>
                  <Ionicons name="swap-vertical" size={28} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.endCallBtn}
                onPress={() => {
                  setIsCalling(false);
                  setShowCallModal(false);
                }}
              >
                <Ionicons name="call" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },

  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 8,
  },

  backBtn: {
    padding: 8,
  },

  headerInfo: {
    flex: 1,
  },

  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  chatName: {
    fontSize: 15,
    color: COLORS.black,
  },

  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#26A69A',
  },

  onlineText: {
    fontSize: 11,
    color: '#26A69A',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 2,
  },

  moreBtn: {
    padding: 8,
  },

  messagesList: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  messageContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },

  userMessageContainer: {
    justifyContent: 'flex-end',
  },

  doctorMessageContainer: {
    justifyContent: 'flex-start',
  },

  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },

  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },

  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },

  doctorBubble: {
    backgroundColor: '#F0F4F8',
    borderBottomLeftRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },

  userText: {
    color: '#FFFFFF',
  },

  doctorText: {
    color: '#1A202C',
  },

  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },

  timestamp: {
    fontSize: 11,
  },

  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },

  doctorTimestamp: {
    color: '#A0AEC0',
  },

  readIcon: {
    marginLeft: 2,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 8,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFB',
    borderRadius: 24,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  attachBtn: {
    padding: 8,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 14,
    color: '#1A202C',
    maxHeight: 100,
  },

  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 3,
  },

  sendBtnDisabled: {
    backgroundColor: '#CBD5E0',
  },

  callBtn: {
    padding: 8,
    marginRight: 8,
  },

  callModalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  callModalContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  closeCallModal: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  callModalAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  callModalName: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 4,
  },

  callModalSpecialty: {
    fontSize: 14,
    color: '#B0BEC5',
    marginBottom: 40,
  },

  callTypeButtons: {
    flexDirection: 'row',
    gap: 30,
    width: '100%',
    justifyContent: 'center',
  },

  callTypeBtn: {
    alignItems: 'center',
    gap: 12,
  },

  callTypeIconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8FAFB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  callTypeText: {
    fontSize: 13,
    color: '#FFFFFF',
  },

  callScreenContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },

  callScreenClose: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 14,
  },

  callScreenAvatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: COLORS.primary,
    marginBottom: 20,
  },

  callScreenName: {
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
  },

  callTimer: {
    marginVertical: 20,
  },

  callTimerText: {
    fontSize: 32,
    color: COLORS.primary,
  },

  callControls: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },

  callControlBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  endCallBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF5252',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 0.4,
    elevation: 5,
  },
});
