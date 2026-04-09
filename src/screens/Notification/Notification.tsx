import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from '../../components/Label/Labels';
import { COLORS, FONTS } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/Header/CustomHeader';

const unreadNotifications = [
  {
    id: '1',
    text: 'Your post just went viral! It’s trending across the platform, garnering thousands of likes and shares.',
  },
  {
    id: '2',
    text: 'You were tagged in a photo! View the image and share your thoughts in the comments.',
  },
];

const pastNotifications = [
  {
    id: '3',
    text: 'Someone replied to your comment! Check out their response and continue the discussion.',
  },
  {
    id: '4',
    text: '@johncampbell mentioned you in a comment. Join the conversation and respond to their message.',
  },
];

// Only Mentions (you can extend this later)
const mentionNotifications = [
  {
    id: '4',
    text: '@johncampbell mentioned you in a comment. Join the conversation and respond to their message.',
  },
];

const Notification = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'mentions'>('all');

  const renderNotificationCard = (item: { id: string; text: string }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-outline" size={22} color={COLORS.primary} />
      </View>
      <Label
        labelContent={item.text}
        family={FONTS.AxiformaRegular}
        size={13}
        color={COLORS.textColor || '#111827'}
        textStyle={{ flex: 1, lineHeight: 18 }}
      />
    </View>
  );

  const renderAllNotifications = () => (
    <>
      <Label
        labelContent="Unread"
        family={FONTS.AxiformaSemiBold}
        size={14}
        color={COLORS.gray || '#6b7280'}
        mb={8}
      />
      {unreadNotifications.map(renderNotificationCard)}
      <Label
        labelContent="Past Notifications"
        family={FONTS.AxiformaSemiBold}
        size={14}
        color={COLORS.gray || '#6b7280'}
        mt={24}
        mb={8}
      />
      {pastNotifications.map(renderNotificationCard)}
    </>
  );

  const renderMentions = () => (
    <>
      <Label
        labelContent="Mentions"
        family={FONTS.AxiformaSemiBold}
        size={14}
        color={COLORS.gray || '#6b7280'}
        mb={8}
      />
      {mentionNotifications.map(renderNotificationCard)}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <CustomHeader title="All Notifications" /> */}

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
          activeOpacity={0.8}
        >
          <Label
            labelContent="All Notifications"
            family={FONTS.AxiformaSemiBold}
            size={13}
            color={
              activeTab === 'all'
                ? COLORS.black || '#111827'
                : COLORS.gray || '#6b7280'
            }
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'mentions' && styles.activeTab]}
          onPress={() => setActiveTab('mentions')}
          activeOpacity={0.8}
        >
          <Label
            labelContent="Mentions"
            family={FONTS.AxiformaSemiBold}
            size={13}
            color={
              activeTab === 'mentions'
                ? COLORS.black || '#111827'
                : COLORS.gray || '#6b7280'
            }
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'all' ? renderAllNotifications() : renderMentions()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf2ff', // light bluish background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginVertical: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeTab: {
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0ebff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
