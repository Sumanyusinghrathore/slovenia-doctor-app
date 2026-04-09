import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Label from '../../../components/Label/Labels';
import { FONTS, COLORS, genericStyles } from '../../../constants';
import { useApp, navigationStateType } from '../../../context/AppContext';
import { patientApi } from '../../../services/patientApi';

/* ================= TYPES ================= */

interface StoredUser {
  token: string;
}

type ProfileProps = {
  navigation: NativeStackNavigationProp<any>;
};

/* ================= MENU ================= */

const menuItems = [
  {
    id: 1,
    icon: 'person-circle-outline',
    label: 'Profile',
    screen: 'MyProfile',
  },
  {
    id: 4,
    icon: 'settings-outline',
    label: 'Settings',
    screen: 'Settings',
  },
  {
    id: 5,
    icon: 'log-out-outline',
    label: 'Logout',
    screen: 'Logout',
  },
];


/* ================= SCREEN ================= */

const Profile = ({ navigation }: ProfileProps) => {
  const [user, setUser] = useState<StoredUser | null>(null);

  const { setNavigationState, setUserData } = useApp();

  /* 🔐 Load token */
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  /* 👤 Profile API */
  const { data: profile = {} } = useQuery(
    ['patient-profile', user?.token],
    () => patientApi.getProfile(user!.token),
    {
      enabled: Boolean(user?.token),
    },
  );

  const name = profile?.name || 'Guest User';
  const email = profile?.email || 'guest@email.com';
  const profileImage =
    profile?.profileImage ||
    'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg';

  /* 🚪 MENU HANDLER */
  const handleMenuPress = async (item: any) => {
    if (item.screen === 'Logout') {
      try {
        await AsyncStorage.removeItem('userData');

        setUserData(null);
        setNavigationState(navigationStateType.AUTH);
      } catch (e) {
        console.log('Logout error:', e);
      }
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title="Profile" /> */}

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ===== PROFILE HEADER ===== */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />

          <Label
            labelContent={name}
            family={FONTS.AxiformaBold}
            size={20}
            color={COLORS.primary}
            mb={4}
          />

          <Label
            labelContent={email}
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.gray}
          />
        </View>

        {/* ===== MENU ===== */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const isLast = index === menuItems.length - 1;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  isLast && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
                onPress={() => handleMenuPress(item)}
              >
                <View style={styles.iconLabelRow}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={COLORS.primary}
                  />
                  <Label
                    labelContent={item.label}
                    family={FONTS.AxiformaSemiBold}
                    size={15}
                    color={COLORS.black}
                    mh={20}
                  />
                </View>

                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
