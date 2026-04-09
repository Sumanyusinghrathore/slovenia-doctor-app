import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import Label from '../Label/Labels';

interface DrawerContentProps {
  navigation: DrawerNavigationProp<any>;
}

const DrawerContent: React.FC<DrawerContentProps> = (props) => {
  const navigation = props.navigation;
  const MENU_ITEMS = [
    {
      id: 1,
      label: 'Family Members',
      icon: 'account-multiple-outline',
      route: 'FamilyMembers',
    },
    {
      id: 2,
      label: 'My Address',
      icon: 'map-marker-outline',
      route: 'MyAddress',
    },
    {
      id: 3,
      label: 'My Bookings',
      icon: 'calendar-outline',
      route: 'MyBookings',
    },
    {
      id: 4,
      label: 'Settings',
      icon: 'cog-outline',
      route: 'Settings',
    },
    {
      id: 5,
      label: 'Help & Support',
      icon: 'help-circle-outline',
      route: 'HelpSupport',
    },
  ];

  const BOTTOM_ITEMS = [
    { label: 'Privacy Policy', route: 'PrivacyPolicy' },
    { label: 'Terms & Conditions', route: 'TermsConditions' },
  ];

  const handleMenuPress = (route: string) => {
    navigation.navigate(route);
    navigation.closeDrawer();
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with User Info */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Logout Button at Top */}
        <TouchableOpacity
          style={styles.logoutTopButton}
          onPress={handleLogout}
        >
          <MaterialCommunityIcons
            name="logout"
            size={20}
            color={COLORS.primary}
          />
          <Label
            labelContent="Logout"
            family={FONTS.AxiformaSemiBold}
            textStyle={styles.logoutText}
          />
        </TouchableOpacity>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.userAvatar}>
            <Label
              labelContent="👤"
              family={FONTS.AxiformaBold}
              textStyle={{ fontSize: 40 }}
            />
          </View>
          <View style={styles.userInfo}>
            <Label
              labelContent="John Smith"
              family={FONTS.AxiformaBold}
              textStyle={styles.userName}
            />
          </View>
          <TouchableOpacity style={styles.editButton}>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {MENU_ITEMS.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.route)}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={COLORS.primary}
              />
              <Label
                labelContent={item.label}
                family={FONTS.AxiformaRegular}
                textStyle={styles.menuLabel}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {BOTTOM_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMenuPress(item.route)}
            >
              <Label
                labelContent={item.label}
                family={FONTS.AxiformaRegular}
                textStyle={styles.bottomLabel}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Logout Button at Bottom */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <MaterialCommunityIcons
          name="logout"
          size={20}
          color={COLORS.primary}
        />
        <Label
          labelContent="Logout"
          family={FONTS.AxiformaSemiBold}
          textStyle={styles.logoutText}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  logoutTopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },

  logoutText: {
    marginLeft: 12,
    fontSize: 16,
    color: COLORS.primary,
  },

  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },

  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  userInfo: {
    flex: 1,
  },

  userName: {
    fontSize: 18,
    color: COLORS.black,
  },

  editButton: {
    padding: 8,
  },

  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },

  menuSection: {
    marginBottom: 32,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  menuLabel: {
    marginLeft: 16,
    fontSize: 16,
    color: COLORS.black,
  },

  bottomSection: {
    marginTop: 'auto',
    paddingVertical: 16,
  },

  bottomLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});
