import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Label from '../../components/Label/Labels';
import { COLORS, FONTS, genericStyles } from '../../constants';
import { useApp } from '../../context/AppContext';

const AdminWorkspace = () => {
  const { userData } = useApp();

  return (
    <SafeAreaView style={genericStyles.container}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Label labelContent={`Welcome, ${userData?.name || 'Admin'}`} family={FONTS.AxiformaBold} size={24} color={COLORS.primary} mb={10} />
          <Label
            labelContent="Admin login supported hai. Yeh panel doctor aur compounder operations monitor karne ke liye configured hai, patient login flow included nahi hai."
            family={FONTS.AxiformaRegular}
            size={14}
            color={COLORS.textGray}
          />
        </View>
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
  },
});

export default AdminWorkspace;
