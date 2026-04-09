import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants';
import { useApp } from '../../context/AppContext';
import AdminWorkspace from '../../screens/Admin/AdminWorkspace';
import CompounderWorkspace from '../../screens/Compounder/CompounderWorkspace';
import DoctorWorkspace from '../../screens/Doctor/DoctorWorkspace';
import StaffAccount from '../../screens/Common/StaffAccount';

const Tab = createBottomTabNavigator();
const ACTIVE_COLOR = COLORS.primary;
const INACTIVE_COLOR = '#B0B0B0';

type SupportedRole = 'admin' | 'doctor' | 'compounder';

type RoleTab = {
  name: string;
  label: string;
  component: React.ComponentType<any>;
  icon: string;
};

const ROLE_TABS: Record<SupportedRole, RoleTab[]> = {
  admin: [
    {
      name: 'AdminWorkspace',
      label: 'Overview',
      component: AdminWorkspace,
      icon: 'shield-account-outline',
    },
    {
      name: 'AdminAccount',
      label: 'Account',
      component: StaffAccount,
      icon: 'account-circle-outline',
    },
  ],
  doctor: [
    {
      name: 'DoctorWorkspace',
      label: 'Requests',
      component: DoctorWorkspace,
      icon: 'account-heart-outline',
    },
    {
      name: 'DoctorAccount',
      label: 'Account',
      component: StaffAccount,
      icon: 'account-circle-outline',
    },
  ],
  compounder: [
    {
      name: 'CompounderWorkspace',
      label: 'Visits',
      component: CompounderWorkspace,
      icon: 'home-heart',
    },
    {
      name: 'CompounderAccount',
      label: 'Account',
      component: StaffAccount,
      icon: 'account-circle-outline',
    },
  ],
};

const BottomTabs = () => {
  const { userData } = useApp();
  const role = (userData?.role || 'doctor') as SupportedRole;
  const tabs = ROLE_TABS[role] || ROLE_TABS.doctor;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const currentTab = tabs.find(tab => tab.name === route.name);

        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: INACTIVE_COLOR,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={currentTab?.icon || 'circle'}
              size={24}
              color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
            />
          ),
        };
      }}
    >
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{ tabBarLabel: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: Platform.OS === 'ios' ? 85 : 70,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    elevation: 15,
    paddingBottom: Platform.OS === 'ios' ? 5 : 0,
    paddingTop: 5,
  },
});
