import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomHeader from '../../../components/Header/CustomHeader';
import Label from '../../../components/Label/Labels';
import { genericStyles, COLORS, FONTS } from '../../../constants';
import { useApp, navigationStateType } from '../../../context/AppContext';

/* ================= WEB URLS ================= */

const WEB_URLS = {
  privacy: 'https://bookmyadventure.co.in/policy/privacy',
  contact: 'https://bookmyadventure.co.in/contact',
  tos: 'https://bookmyadventure.co.in/policy/tos',
  refund: 'https://bookmyadventure.co.in/policy/refund',
  data: 'https://bookmyadventure.co.in/policy/data',
};

/* ================= MENU ITEMS ================= */

const settingsItems = [
  {
    id: 1,
    icon: 'person-outline',
    title: 'Edit Profile',
    subtitle: 'Update your personal information',
    screen: 'MyProfile',
  },
  {
    id: 2,
    icon: 'shield-checkmark-outline',
    title: 'Privacy Policy',
    subtitle: 'View our privacy and data policies',
    url: WEB_URLS.privacy,
  },
  {
    id: 3,
    icon: 'document-text-outline',
    title: 'Terms of Service',
    subtitle: 'Read our terms and conditions',
    url: WEB_URLS.tos,
  },
  {
    id: 4,
    icon: 'refresh-outline',
    title: 'Refund Policy',
    subtitle: 'Know about refunds and cancellations',
    url: WEB_URLS.refund,
  },
  {
    id: 5,
    icon: 'help-circle-outline',
    title: 'Help & Support',
    subtitle: 'Get assistance with your account',
    url: WEB_URLS.contact,
  },
  {
    id: 6,
    icon: 'key-outline',
    title: 'Change Password',
    subtitle: 'Update your account password',
    screen: 'ChangePassword',
  },
  {
    id: 7,
    icon: 'log-out-outline',
    title: 'Logout',
    subtitle: 'Sign out from your account',
    screen: 'Logout',
    danger: true,
  },
];

/* ================= SCREEN ================= */

const Settings = ({ navigation }: any) => {
  const { setNavigationState, setUserData } = useApp();

  const handlePress = async (item: any) => {
    // 🌐 Open Website URL
    if (item.url) {
      const supported = await Linking.canOpenURL(item.url);
      if (supported) {
        await Linking.openURL(item.url);
      }
      return;
    }

    // 🚪 Logout
    if (item.screen === 'Logout') {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      setNavigationState(navigationStateType.AUTH);
      return;
    }

    // 📱 Navigate inside app
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title="Settings" /> */}

      <ScrollView contentContainerStyle={styles.container}>
        {settingsItems.map(item => {
          const isLogout = item.danger;

          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, isLogout && styles.logoutCard]}
              activeOpacity={0.7}
              onPress={() => handlePress(item)}
            >
              <View style={styles.leftRow}>
                <View
                  style={[
                    styles.iconWrapper,
                    isLogout && styles.logoutIcon,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={isLogout ? '#EF4444' : COLORS.primary}
                  />
                </View>

                <View>
                  <Label
                    labelContent={item.title}
                    family={FONTS.AxiformaSemiBold}
                    size={15}
                    color={isLogout ? '#EF4444' : COLORS.black}
                  />
                  <Label
                    labelContent={item.subtitle}
                    family={FONTS.AxiformaRegular}
                    size={12}
                    color={COLORS.gray}
                    mt={4}
                  />
                </View>
              </View>

              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color={isLogout ? '#EF4444' : '#9CA3AF'}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  logoutCard: {
    backgroundColor: '#FEF2F2',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  logoutIcon: {
    backgroundColor: '#FEE2E2',
  },
});
