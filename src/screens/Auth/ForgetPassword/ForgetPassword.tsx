import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';

import UseInput from '../../../components/Hook/UseInput';
import Label from '../../../components/Label/Labels';
import { genericStyles, FONTS, COLORS } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import TouchableComponent from '../../../components/Routine/TouchableComponent';

type ForgotFormValues = {
  email: string;
};

const ForgotPassword = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotFormValues) => {
    // TODO: integrate your forgot password API here
    console.log('Forgot password email:', data.email);
    // Example: after success, go back to login
    // navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={[genericStyles?.container || {}, styles.container]}>
      {/* Hide status bar on this screen */}
      <StatusBar hidden />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <View style={styles.logoWrapper}>
              <View style={styles.logoCircle}>
                <Label
                  labelContent="BMA"
                  family={FONTS.AxiformaBlack}
                  size={30}
                  color={COLORS.primary}
                  mb={0}
                />
              </View>
            </View>

            {/* Title + subtitle */}
            <View style={styles.titleBlock}>
              <Label
                labelContent="Forgot Password"
                family={FONTS.AxiformaSemiBold}
                size={22}
                color={COLORS.black}
                mb={4}
              />
              <Label
                labelContent="Enter your email and we'll send you a reset link"
                family={FONTS.AxiformaRegular}
                size={13}
                color={COLORS.gray || '#777'}
                mb={0}
              />
            </View>

            {/* Card container */}
            <View style={styles.formCard}>
              <Label
                labelContent="Reset Password"
                family={FONTS.AxiformaSemiBold}
                size={18}
                color={COLORS.black}
                mb={15}
              />

              {/* Email input */}
              <UseInput
                control={control}
                name="email"
                topLabel="Email"
                placeholder="Enter your registered email"
                keyboardType="email-address"
                autoCapitalize="none"
                renderLeftIcon={{
                  type: 'ionicon',
                  name: 'mail-outline',
                  size: 18,
                  color: COLORS.gray,
                }}
                leftIconContainerStyle={{ marginLeft: 10, marginRight: 8 }}
                inputContainerStyle={{ paddingLeft: 10 }}
                required
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter a valid email',
                  },
                }}
                error={!!errors?.email}
                errorMessage={errors?.email?.message}
              />

              {/* Send reset link button */}
              <TouchableComponent
                style={styles.resetButton}
                onPress={handleSubmit(onSubmit)}
              >
                <Label
                  labelContent="Send Reset Link"
                  family={FONTS.AxiformaSemiBold}
                  size={15}
                  color={COLORS.white}
                  mb={0}
                />
              </TouchableComponent>
            </View>

            {/* Bottom actions */}
            <View style={styles.bottomWrapper}>
              <View style={styles.bottomRow}>
                <Ionicons
                  name="chevron-back"
                  size={16}
                  color={COLORS.primary}
                  style={{ marginRight: 4 }}
                />
                <TouchableComponent
                  onPress={() => navigation.navigate('SignIn')}
                >
                  <Label
                    labelContent="Back to Login"
                    family={FONTS.AxiformaSemiBold}
                    size={13}
                    color={COLORS.primary}
                    mb={0}
                  />
                </TouchableComponent>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray || '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  resetButton: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomWrapper: {
    marginTop: 24,
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
