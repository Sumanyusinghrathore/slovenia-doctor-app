import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import CustomHeader from '../../../components/Header/CustomHeader';
import Loader from '../../../components/Loader/Loader';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

/* 🩺 HEALTH CARE CATEGORIES – JANSEVA */
const HEALTH_CATEGORIES = [
  {
    id: 'general-checkup',
    label: 'Checkup',
    fullLabel: 'General Health Checkup',
    icon: 'medkit-outline',
    gradient: ['#FFE5E5', '#FFE5E5'],
    color: '#FF6B6B',
  },
  {
    id: 'doctor-consultation',
    label: 'Doctors',
    fullLabel: 'Doctor Consultation',
    icon: 'person-circle-outline',
    gradient: ['#E5F5FF', '#E5F5FF'],
    color: '#4A90E2',
  },
  {
    id: 'diagnostic-tests',
    label: 'Diagnostics',
    fullLabel: 'Diagnostic Tests',
    icon: 'flask-outline',
    gradient: ['#E8F5E9', '#E8F5E9'],
    color: '#66BB6A',
  },
  {
    id: 'blood-donation',
    label: 'Blood',
    fullLabel: 'Blood Donation Camp',
    icon: 'water-outline',
    gradient: ['#FCE4EC', '#FCE4EC'],
    color: '#EC407A',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    fullLabel: 'Emergency Services',
    icon: 'alert-circle-outline',
    gradient: ['#FFF3E0', '#FFF3E0'],
    color: '#FB8C00',
  },
  {
    id: 'vaccination',
    label: 'Vaccine',
    fullLabel: 'Vaccination Services',
    icon: 'bandage-outline',
    gradient: ['#F3E5F5', '#F3E5F5'],
    color: '#AB47BC',
  },
  {
    id: 'mental-health',
    label: 'Mental',
    fullLabel: 'Mental Health Care',
    icon: 'heart-outline',
    gradient: ['#FFF9C4', '#FFF9C4'],
    color: '#FDD835',
  },
  {
    id: 'elder-care',
    label: 'Elder Care',
    fullLabel: 'Senior Citizen Care',
    icon: 'accessibility-outline',
    gradient: ['#E0F2F1', '#E0F2F1'],
    color: '#26A69A',
  },
];

const HealthcareService = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [scaleValue] = useState(new Animated.Value(1));

  /* 🔄 Simulated loading */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderCategory = ({
    item,
  }: {
    item: typeof HEALTH_CATEGORIES[number];
  }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.categoryItemContainer}
      onPress={() => {
        if (item.id === 'doctor-consultation') {
          navigation.navigate('DoctorConsultation', {
            categoryId: item.id,
            title: item.fullLabel,
          });
        } else {
          navigation.navigate('DynamicHealthcareDetails', {
            categoryId: item.id,
            title: item.fullLabel,
          });
        }
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryItem}
      >
        <View style={[styles.iconWrapper, { backgroundColor: item.color + '20' }]}>
          <Ionicons name={item.icon} size={40} color={item.color} />
        </View>

        <Label
          labelContent={item.label.toUpperCase()}
          family={FONTS.AxiformaSemiBold}
          textStyle={[styles.categoryLabel, { color: item.color }]}
        />

        <View style={styles.arrowIcon}>
          <Ionicons name="chevron-forward" size={20} color={item.color} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  /* Loader */
  if (loading) {
    return (
      <SafeAreaView style={genericStyles.container}>
        {/* <CustomHeader title="Healthcare Services" /> */}
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      {/* <CustomHeader title="Healthcare Services" /> */}

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Label
            labelContent="Healthcare Services"
            family={FONTS.AxiformaBold}
            textStyle={styles.title}
          />
          <Label
            labelContent="Pick a service to take care of your health"
            family={FONTS.AxiformaRegular}
            textStyle={styles.subtitle}
          />
        </View>

        {/* Grid */}
        <FlatList
          data={HEALTH_CATEGORIES}
          keyExtractor={item => item.id}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.categoryGrid}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default HealthcareService;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },

  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFB',
  },

  header: {
    marginTop: 12,
    marginBottom: 20,
    paddingHorizontal: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: 6,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },

  categoryGrid: {
    paddingTop: 6,
    paddingBottom: 32,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  categoryItemContainer: {
    width: '48%',
  },

  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    elevation: 4,
    position: 'relative',
  },

  iconWrapper: {
    height: 60,
    width: 60,
    borderRadius: 16,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.3,
    lineHeight: 18,
  },

  arrowIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    opacity: 0.4,
  },
});
