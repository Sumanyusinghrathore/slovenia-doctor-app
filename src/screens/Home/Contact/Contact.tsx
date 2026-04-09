import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import AppButton from '../../../components/CustomButton/AppButton';
import UseInput from '../../../components/Hook/UseInput';
import CustomHeader from '../../../components/Header/CustomHeader';

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { control, handleSubmit } = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log('Contact form data:', data);
  };

  /* 🔹 TOP INFO */
  const CONTACT_ITEMS = [
    {
      id: 'phone',
      icon: 'call-outline',
      title: 'Call Us',
      value: '+91 9024962067',
    },
    {
      id: 'email',
      icon: 'mail-outline',
      title: 'Email',
      value: 'hello@jansevacare.in',
    },
    {
      id: 'address',
      icon: 'location-outline',
      title: 'Address',
      value: 'Udaipur, Rajasthan',
    },
  ];

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      {/* <CustomHeader title="Contact Jan Seva Care" /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <Label
            labelContent="We’re here to help you"
            family={FONTS.AxiformaBold}
            size={22}
            color={COLORS.white}
            align="center"
          />
          <Label
            labelContent="Reach out anytime for healthcare assistance"
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.white}
            mt={6}
            align="center"
          />
        </View>

        {/* CONTACT INFO */}
        <View style={styles.infoRow}>
          {CONTACT_ITEMS.map(item => (
            <View key={item.id} style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons name={item.icon} size={22} color={COLORS.primary} />
              </View>
              <Label
                labelContent={item.title}
                family={FONTS.AxiformaSemiBold}
                size={13}
                mt={6}
              />
              <Label
                labelContent={item.value}
                family={FONTS.AxiformaRegular}
                size={12}
                color={COLORS.third}
                mt={2}
                align="center"
              />
            </View>
          ))}
        </View>

        {/* WE CAN HELP YOU WITH */}
        <View style={styles.card}>
          <Label
            labelContent="We Can Help You With"
            family={FONTS.AxiformaBold}
            size={18}
            mb={12}
          />

          {[
            'Booking medical appointments',
            'General health inquiries',
            'Service information',
            'Pricing and packages',
            'Medical emergency guidance',
            'Follow-up care questions',
          ].map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color={COLORS.primary}
              />
              <Label
                labelContent={item}
                family={FONTS.AxiformaRegular}
                size={13}
              />
            </View>
          ))}
        </View>

        {/* HOW WE RESPOND */}
        <View style={styles.responseRow}>
          <View style={styles.responseCard}>
            <Ionicons name="flash-outline" size={26} color={COLORS.primary} />
            <Label labelContent="Within 30 mins" family={FONTS.AxiformaBold} />
            <Label
              labelContent="Initial response"
              size={12}
              color={COLORS.third}
            />
          </View>

          <View style={styles.responseCard}>
            <Ionicons name="call-outline" size={26} color={COLORS.primary} />
            <Label labelContent="1–2 Hours" family={FONTS.AxiformaBold} />
            <Label
              labelContent="Call confirmation"
              size={12}
              color={COLORS.third}
            />
          </View>

          <View style={styles.responseCard}>
            <Ionicons
              name="calendar-outline"
              size={26}
              color={COLORS.primary}
            />
            <Label labelContent="Same Day" family={FONTS.AxiformaBold} />
            <Label
              labelContent="Appointment"
              size={12}
              color={COLORS.third}
            />
          </View>
        </View>

        {/* EMERGENCY */}
        <View style={styles.emergencyCard}>
          <Ionicons name="alert-circle" size={28} color="#E11D48" />
          <Label
            labelContent="Medical Emergency?"
            family={FONTS.AxiformaBold}
            size={16}
            mt={6}
          />
          <Label
            labelContent="Call 102 (Ambulance) or 108 immediately."
            size={13}
            color={COLORS.third}
            mt={4}
            align="center"
          />
        </View>

        {/* FORM */}
        <View style={styles.formCard}>
          <Label
            labelContent="Send us a Message"
            family={FONTS.AxiformaBold}
            size={18}
            mb={12}
          />

          <UseInput
            control={control}
            name="name"
            topLabel="Full Name"
            placeholder="Your Name"
          />

          <UseInput
            control={control}
            name="email"
            topLabel="Email"
            placeholder="your@email.com"
            keyboardType="email-address"
            viewStyle={{ marginTop: 10 }}
          />

          <UseInput
            control={control}
            name="subject"
            topLabel="Subject"
            placeholder="How can we help?"
            viewStyle={{ marginTop: 10 }}
          />

          <UseInput
            control={control}
            name="message"
            topLabel="Message"
            placeholder="Write your message..."
            multiline
            numberOfLines={4}
            viewStyle={{ marginTop: 10 }}
          />

          <View style={{ marginTop: 16 }}>
            <AppButton title="Send Message" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Contact;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F6F9FC',
  },

  hero: {
    backgroundColor: COLORS.primary,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: -30,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },

  infoCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    elevation: 4,
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EAF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    elevation: 3,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  responseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 16,
  },

  responseCard: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#EEF4FF',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },

  emergencyCard: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: '#ECFEF3',
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
  },

  formCard: {
    marginTop: 24,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    elevation: 4,
    marginBottom: 30,
  },
});
