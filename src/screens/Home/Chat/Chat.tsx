import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';

/* MOCK CHATS DATA */
const MOCK_CHATS = [
  {
    id: '1',
    name: 'Dr. David Patel',
    specialty: 'Cardiologist',
    lastMessage: 'Please take the medication as prescribed',
    lastMessageTime: '10:30 AM',
    avatar: 'https://via.placeholder.com/50?text=Dr+Patel',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Dr. Jessica Turner',
    specialty: 'Gynecologist',
    lastMessage: 'Your reports look good. Follow up next month',
    lastMessageTime: '9:15 AM',
    avatar: 'https://via.placeholder.com/50?text=Dr+Turner',
    unread: 0,
    online: true,
  },
  {
    id: '3',
    name: 'Health Support Team',
    specialty: 'General Help',
    lastMessage: 'Thank you for contacting us. How can we help?',
    lastMessageTime: 'Yesterday',
    avatar: 'https://via.placeholder.com/50?text=Support',
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Dr. Michael Johnson',
    specialty: 'Orthopedic Surgery',
    lastMessage: 'Schedule your follow-up appointment soon',
    lastMessageTime: '2 days ago',
    avatar: 'https://via.placeholder.com/50?text=Dr+Johnson',
    unread: 0,
    online: true,
  },
  {
    id: '5',
    name: 'Pharmacy Support',
    specialty: 'Prescription Help',
    lastMessage: 'Your prescription is ready for pickup',
    lastMessageTime: '3 days ago',
    avatar: 'https://via.placeholder.com/50?text=Pharmacy',
    unread: 1,
    online: false,
  },
];

const Chat = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState(MOCK_CHATS);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChatItem = ({ item }: { item: typeof MOCK_CHATS[0] }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          chat: item,
        })
      }
      style={styles.chatItem}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.avatar}
        />
        {item.online && <View style={styles.onlineBadge} />}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Label
            labelContent={item.name}
            family={FONTS.AxiformaBold}
            textStyle={styles.chatName}
          />
          <Label
            labelContent={item.lastMessageTime}
            family={FONTS.AxiformaRegular}
            textStyle={styles.chatTime}
          />
        </View>

        <Label
          labelContent={item.specialty}
          family={FONTS.AxiformaRegular}
          textStyle={styles.specialty}
        />

        <View style={styles.messageRow}>
          <Label
            labelContent={item.lastMessage}
            family={FONTS.AxiformaRegular}
            textStyle={styles.lastMessage}
            numberOfLines={1}
          />
          {item.unread > 0 && (
            <View style={styles.unreadBadge}>
              <Label
                labelContent={String(item.unread)}
                family={FONTS.AxiformaBold}
                textStyle={styles.unreadText}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <Label
          labelContent="Messages"
          family={FONTS.AxiformaBold}
          textStyle={styles.headerTitle}
        />
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#A0AEC0" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#A0AEC0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Chats List */}
      {filteredChats.length > 0 ? (
        <FlatList
          data={filteredChats}
          keyExtractor={item => item.id}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubbles-outline" size={48} color="#CBD5E0" />
          <Label
            labelContent="No messages found"
            family={FONTS.AxiformaBold}
            textStyle={styles.emptyText}
          />
          <Label
            labelContent="Start a conversation with a doctor"
            family={FONTS.AxiformaRegular}
            textStyle={styles.emptySubtext}
          />
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Chat;

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
  },

  headerTitle: {
    fontSize: 28,
    color: '#1A202C',
  },

  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A202C',
  },

  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 20,
  },

  chatItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.05,
    elevation: 2,
  },

  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F4F8',
  },

  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#26A69A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  chatContent: {
    flex: 1,
  },

  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  chatName: {
    fontSize: 15,
    color: '#1A202C',
    flex: 1,
  },

  chatTime: {
    fontSize: 12,
    color: '#A0AEC0',
    marginLeft: 8,
  },

  specialty: {
    fontSize: 12,
    color: COLORS.primary,
    marginBottom: 6,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  lastMessage: {
    fontSize: 13,
    color: '#718096',
    flex: 1,
  },

  unreadBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  unreadText: {
    fontSize: 11,
    color: '#FFFFFF',
  },

  separator: {
    height: 4,
    backgroundColor: 'transparent',
  },

  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 18,
    color: '#4A5568',
    marginTop: 12,
  },

  emptySubtext: {
    fontSize: 13,
    color: '#A0AEC0',
    marginTop: 6,
    textAlign: 'center',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.3,
    elevation: 5,
  },
});
