import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

import Label from '../../components/Label/Labels';
import { COLORS, FONTS, genericStyles } from '../../constants';
import { navigationStateType, useApp } from '../../context/AppContext';

const StaffAccount = () => {
  const { userData, setNavigationState, setUserData } = useApp();

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    setUserData(null);
    setNavigationState(navigationStateType.AUTH);
  };

  return (
    <SafeAreaView style={genericStyles.container}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Label
            labelContent={userData?.name || 'Staff User'}
            family={FONTS.AxiformaBold}
            size={22}
            color={COLORS.primary}
            mb={10}
          />
          <Label
            labelContent={userData?.email || 'No email found'}
            family={FONTS.AxiformaRegular}
            size={14}
            color={COLORS.textGray}
            mb={8}
          />
          <Label
            labelContent={`Role: ${userData?.role || 'staff'}`}
            family={FONTS.AxiformaMedium}
            size={14}
            color={COLORS.black}
          />
        </View>

        <View style={styles.infoCard}>
          <Label
            labelContent="Yeh app sirf admin, doctor aur compounder workflows ke liye configured hai."
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.textGray}
            mb={10}
          />
          <Label
            labelContent="Yeh patient-side app nahi hai. Sirf staff operations aur assigned records yahan handle honge."
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.textGray}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Label labelContent="Logout" family={FONTS.AxiformaMedium} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
});

export default StaffAccount;
