import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import Loader from '../../../components/Loader/Loader';
import InputComponent from '../../../components/CustomInput/InputComponent';
import { navigationStateType, useApp } from '../../../context/AppContext';
import { patientApi, PatientProfileUpdatePayload } from '../../../services/patientApi';

interface StoredUser {
  token: string;
}

interface ProfileData {
  name?: string;
  email?: string;
  phone?: string;
  age?: number | string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  profileImage?: string;
}

const ProfileRow = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) => (
  <View style={styles.row}>
    <View style={styles.rowLeft}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
      <Label
        labelContent={label}
        family={FONTS.AxiformaMedium}
        textStyle={styles.rowLabel}
      />
    </View>

    <Label
      labelContent={value}
      family={FONTS.AxiformaRegular}
      textStyle={styles.rowValue}
    />
  </View>
);

/* ================= SCREEN ================= */
const MyProfile = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const { setNavigationState, setUserData } = useApp();
  const [editVisible, setEditVisible] = useState(false);
  const [editData, setEditData] = useState<ProfileData>({});

  /* 🔐 GET TOKEN */
  useEffect(() => {
    const getToken = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    getToken();
  }, []);

  const profileQuery = useQuery(
    ['patient-profile', user?.token],
    () => patientApi.getProfile(user!.token),
    {
      enabled: Boolean(user?.token),
    },
  );

  const loading = profileQuery.isLoading;
  const profile: ProfileData = profileQuery.data || {};


  /* ⏳ LOADER */
  if (loading) {
    return (
      <SafeAreaView style={genericStyles.container}>
        {/* <CustomHeader title="rrMy Profile" /> */}
        <Loader />
      </SafeAreaView>
    );
  }

  /* ✏️ OPEN EDIT MODAL */
  const openEditModal = () => {
    setEditData(profile);
    setEditVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!user?.token) {
      return;
    }

    const payload: PatientProfileUpdatePayload = {
      name: editData.name?.trim() || '',
      phone: editData.phone?.trim() || '',
      age:
        typeof editData.age === 'number'
          ? editData.age
          : editData.age
            ? Number(editData.age)
            : null,
      gender: editData.gender?.trim() || '',
      address: editData.address?.trim() || '',
      emergencyContact: editData.emergencyContact?.trim() || '',
    };

    await patientApi.updateProfile(user.token, payload);
    await profileQuery.refetch();

    setEditVisible(false);
  };


  const handleLogout = async () => {
  try {
    await AsyncStorage.clear();
    setUserData(null);
    setNavigationState(navigationStateType.AUTH);
  } catch (e) {
    console.log('Logout error:', e);
  }
};



  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title="My Profile" /> */}

      <View style={styles.container}>
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: profile.profileImage || 'https://via.placeholder.com/150',
            }}
            style={styles.avatar}
          />

          <Label
            labelContent={profile.name || '-'}
            family={FONTS.AxiformaBold}
            textStyle={styles.name}
          />
          <Label
            labelContent={profile.email || '-'}
            family={FONTS.AxiformaRegular}
            textStyle={styles.username}
          />
        </View>

        {/* INFO */}
        <View style={styles.infoCard}>
          <ProfileRow
            icon="mail-outline"
            label="Email"
            value={profile.email || '-'}
          />
          <ProfileRow
            icon="call-outline"
            label="Phone"
            value={profile.phone || '-'}
          />
          <ProfileRow icon="person-outline" label="Age" value={String(profile.age || '-')} />
          <ProfileRow icon="male-female-outline" label="Gender" value={profile.gender || '-'} />
          <ProfileRow
            icon="location-outline"
            label="Address"
            value={profile.address || '-'}
          />
          <ProfileRow
            icon="call-outline"
            label="Emergency"
            value={profile.emergencyContact || '-'}
          />
        </View>

        {/* ACTIONS */}
        <TouchableOpacity style={styles.actionBtn} onPress={openEditModal}>
          <Ionicons name="create-outline" size={20} color={COLORS.primary} />
          <Label labelContent="Edit Profile" family={FONTS.AxiformaMedium} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.logoutBtn]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Label labelContent="Logout" family={FONTS.AxiformaMedium} />
        </TouchableOpacity>
      </View>

      {/* ================= EDIT MODAL ================= */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Label
                labelContent="Edit Profile"
                family={FONTS.AxiformaBold}
                textStyle={styles.modalTitle}
              />

              {[
                { key: 'name', placeholder: 'Full Name', topholder: 'Full Name' },
                { key: 'phone', placeholder: 'Phone', topholder: 'Phone' },
                { key: 'age', placeholder: 'Age', topholder: 'Age' },
                { key: 'gender', placeholder: 'Gender', topholder: 'Gender' },
                { key: 'address', placeholder: 'Address', topholder: 'Address' },
                {
                  key: 'emergencyContact',
                  placeholder: 'Emergency Contact',
                  topholder: 'Emergency Contact',
                },
              ].map(item => (
                <InputComponent
                  key={item.key}
                  topLabel={item.topholder}
                  topLabelColor={COLORS.black}
                  placeholder={item.placeholder}
                  value={String(editData[item.key as keyof ProfileData] || '')}
                  onChangeText={text =>
                    setEditData(prev => ({
                      ...prev,
                      [item.key]:
                        item.key === 'age' ? Number(text.replace(/[^0-9]/g, '')) || '' : text,
                    }))
                  }
                />
              ))}


              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveProfile}
              >
                <Label color={COLORS.white} labelContent="Save Changes" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditVisible(false)}
              >
                <Label labelContent="Cancel" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyProfile;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    marginBottom: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: { fontSize: 20 },
  username: { fontSize: 13, color: '#6B7280' },
  infoCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    padding: 16,
    marginBottom: 20,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowLabel: { marginLeft: 10 },
  rowValue: { color: '#6B7280' },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 25,
    borderWidth: 1,
    marginBottom: 12,
  },
  logoutBtn: { borderColor: '#EF4444' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 25,
    padding: 20,
  },
  modalTitle: { fontSize: 18, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop:20
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: COLORS.lightBlack,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
});
