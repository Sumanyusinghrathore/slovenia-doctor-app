import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import { useApp, navigationStateType } from '../../../context/AppContext';
import { patientApi } from '../../../services/patientApi';
import renderToast from '../../../helper/renderToast';

const BookAppointment = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const toast = useToast();
  const doctor = route?.params?.doctor;
  const { userData, setNavigationState } = useApp();
  const [problem, setProblem] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!userData?.token) {
      setNavigationState(navigationStateType.AUTH);
      return;
    }

    if (!doctor?.backendDoctorId) {
      renderToast(
        toast,
        'Doctor ID config missing hai. `src/config/patientDoctors.ts` me `backendDoctorId` add karein.',
        'warning',
      );
      return;
    }

    if (!problem.trim()) {
      renderToast(toast, 'Please describe your health problem.', 'warning');
      return;
    }

    try {
      setSubmitting(true);
      const response = await patientApi.requestDoctor(userData.token, {
        doctorId: doctor.backendDoctorId,
        problem: problem.trim(),
      });

      renderToast(toast, 'Doctor request sent successfully.', 'success');
      navigation.navigate('ConfirmAppointment', {
        doctor,
        problem: problem.trim(),
        request: response?.request,
      });
    } catch (error: any) {
      renderToast(
        toast,
        error?.message || 'Unable to send request right now.',
        'danger',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!doctor) {
    return null;
  }

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={28} color={COLORS.black} />
          </TouchableOpacity>
          <Label
            labelContent="Request Doctor"
            family={FONTS.AxiformaBold}
            textStyle={styles.headerTitle}
          />
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.doctorSummary}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <View style={styles.doctorSummaryInfo}>
            <Label
              labelContent={doctor.name}
              family={FONTS.AxiformaBold}
              textStyle={styles.doctorNameSummary}
            />
            <Label
              labelContent={doctor.specialty}
              family={FONTS.AxiformaRegular}
              textStyle={styles.doctorSpecialtySummary}
            />
            <Label
              labelContent={doctor.hospital}
              family={FONTS.AxiformaRegular}
              textStyle={styles.doctorMeta}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Label
            labelContent="Describe Your Problem"
            family={FONTS.AxiformaBold}
            textStyle={styles.sectionTitle}
          />
          <TextInput
            style={styles.problemInput}
            value={problem}
            onChangeText={setProblem}
            multiline
            numberOfLines={6}
            placeholder="Eg. Chest pain since 2 days, weakness, dizziness..."
            placeholderTextColor="#94A3B8"
            textAlignVertical="top"
          />

          <Label
            labelContent={
              doctor.backendDoctorId
                ? 'This request will hit the patient request-doctor API.'
                : 'Live request ke liye config me backendDoctorId fill karna zaroori hai.'
            }
            family={FONTS.AxiformaRegular}
            textStyle={styles.helperText}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.confirmBtn,
            (!doctor.backendDoctorId || submitting) && styles.confirmBtnDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!doctor.backendDoctorId || submitting}
        >
          <Label
            labelContent={submitting ? 'Sending...' : 'Send Request'}
            family={FONTS.AxiformaBold}
            textStyle={styles.confirmBtnText}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointment;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    paddingHorizontal: 14,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 12,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    textAlign: 'center',
  },
  doctorSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: '#F0F4F8',
  },
  doctorSummaryInfo: {
    flex: 1,
  },
  doctorNameSummary: {
    fontSize: 16,
    color: COLORS.black,
  },
  doctorSpecialtySummary: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 4,
  },
  doctorMeta: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 12,
  },
  problemInput: {
    minHeight: 140,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  helperText: {
    marginTop: 10,
    fontSize: 12,
    color: '#64748B',
    lineHeight: 18,
  },
  confirmBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 30,
  },
  confirmBtnDisabled: {
    opacity: 0.6,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
