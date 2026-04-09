import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS } from '../../constants';
import { useApp, navigationStateType } from '../../context/AppContext';

interface DashboardHeaderProps {
  name?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name }) => {
  const navigation = useNavigation<any>();
  const { userData, setNavigationState } = useApp();

  const isLoggedIn = !!userData?.token;

  const handleProfilePress = () => {
    if (isLoggedIn) {
      navigation.navigate('Profile');
    } else {
      setNavigationState(navigationStateType.AUTH);
    }
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.whiteContainer}>
      <View style={styles.innerContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={handleProfilePress}
            style={styles.avatarContainer}
          >
            <Ionicons
              name={isLoggedIn ? 'person-circle-outline' : 'person-outline'}
              size={34}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          <View>
            <Text style={styles.welcomeText}>Welcome Back 👋</Text>
            <Text style={styles.nameText}>
              {isLoggedIn ? name || userData?.name || 'Patient' : 'Guest User'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNotificationPress}
          style={styles.bellButton}
        >
          <Ionicons name="notifications-outline" size={26} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardHeader;



const styles = StyleSheet.create({
  whiteContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
    fontFamily: FONTS.AxiformaMedium,
  },
  nameText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.AxiformaSemiBold,
  },
  bellButton: {
    padding: 6,
  },
});
