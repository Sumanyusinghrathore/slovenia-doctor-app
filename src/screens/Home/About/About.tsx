import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Label from '../../../components/Label/Labels';
import { COLORS, FONTS, genericStyles } from '../../../constants';
import CustomHeader from '../../../components/Header/CustomHeader';
import GradientButton from '../../../components/CustomButton/GradientButton';

/* 🩺 HEALTHCARE SECTIONS */
const HEALTH_SECTIONS = [
  {
    id: 'patient-care',
    icon: 'heart-outline',
    title: 'Patient-Centered Care',
    points: [
      'Personalized treatment plans',
      'Home healthcare services',
      'Compassionate & trained staff',
    ],
  },
  {
    id: 'doctor-network',
    icon: 'medkit-outline',
    title: 'Trusted Doctor Network',
    points: [
      'Verified doctors & specialists',
      'Multi-speciality consultations',
      'Experienced medical professionals',
    ],
  },
  {
    id: 'services',
    icon: 'clipboard-outline',
    title: 'Comprehensive Services',
    points: [
      'Doctor consultations',
      'Diagnostics & lab tests',
      'Elderly & post-care support',
    ],
  },
  {
    id: 'emergency',
    icon: 'alert-circle-outline',
    title: 'Emergency & Support',
    points: [
      'Emergency guidance',
      'Quick response system',
      '24/7 patient assistance',
    ],
  },
];

const About = () => {
  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      {/* <CustomHeader title="About Jan Seva Care" /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <Label
            labelContent="Healthcare You Can Trust"
            family={FONTS.AxiformaBold}
            size={22}
            color={COLORS.white}
            align="center"
          />
          <Label
            labelContent="Connecting patients with trusted doctors and quality care — at home and beyond."
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.white}
            mt={8}
            align="center"
          />
        </View>

        {/* MISSION */}
        <View style={styles.missionCard}>
          <Ionicons name="shield-checkmark-outline" size={28} color={COLORS.primary} />
          <Label
            labelContent="Our Mission"
            family={FONTS.AxiformaBold}
            size={18}
            mt={10}
          />
          <Label
            labelContent="To deliver reliable, affordable, and compassionate healthcare services by bridging the gap between patients and medical professionals."
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.third}
            mt={6}
            align="center"
          />
        </View>

        {/* HEALTH SECTIONS */}
        {HEALTH_SECTIONS.map(section => (
          <View key={section.id} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.iconBox}>
                <Ionicons
                  name={section.icon}
                  size={24}
                  color={COLORS.primary}
                />
              </View>
              <Label
                labelContent={section.title}
                family={FONTS.AxiformaSemiBold}
                size={16}
                ml={10}
              />
            </View>

            {section.points.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.primary}
                />
                <Label
                  labelContent={point}
                  family={FONTS.AxiformaRegular}
                  size={13}
                  ml={8}
                />
              </View>
            ))}
          </View>
        ))}

        {/* CTA */}
        <View style={styles.ctaBox}>
          <Label
            labelContent="Your health matters. Let us take care of you."
            family={FONTS.AxiformaSemiBold}
            size={15}
            align="center"
          />
          <GradientButton
            title="Book a Consultation"
            onPress={() => console.log('Book Consultation')}
            buttonStyle={{ marginTop: 16, paddingHorizontal: 30, bottom: 15 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F6F9FC',
  },

  container: {
    paddingBottom: 40,
  },

  hero: {
    backgroundColor: COLORS.primary,
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  missionCard: {
    marginTop: -30,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  sectionCard: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    elevation: 3,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  ctaBox: {
    marginTop: 30,
    marginHorizontal: 16,
    backgroundColor: '#ECFEF3',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
});
