import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';

import UseInput from '../../../components/Hook/UseInput';
import Label from '../../../components/Label/Labels';
import TouchableComponent from '../../../components/Routine/TouchableComponent';
import { FONTS, COLORS } from '../../../constants';
import renderToast from '../../../helper/renderToast';

type RegisterFormValues = {
  firstname: string;
  lastname: string;
  useremail: string;
  userphone: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigation = useNavigation<any>();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, handleSubmit, watch } = useForm<RegisterFormValues>({
    defaultValues: {
      firstname: '',
      lastname: '',
      useremail: '',
      userphone: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    StatusBar.setHidden(true, 'fade');
    return () => StatusBar.setHidden(false, 'fade');
  }, []);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      renderToast(
        toast,
        'Patient self-registration backend me available nahi hai. Admin se account create karva kar login karein.',
        'warning',
      );
    } catch (err: any) {
      renderToast(toast, err?.message || 'Something went wrong', 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar hidden translucent backgroundColor="transparent" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* LOGO */}
            <View style={styles.logoWrapper}>
              <View >
                <Image
                  source={require('../../../assets/images/Jansevacare.png')} // apna logo path
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* TITLE */}
            <View style={styles.titleBlock}>
              <Label
                labelContent="Create Account"
                family={FONTS.AxiformaSemiBold}
                size={22}
                color={COLORS.black}
              />
              <Label
                labelContent="Staff access is created by admin. Use this screen only if onboarding is enabled later."
                size={13}
                color={COLORS.gray}
              />
            </View>

            {/* FORM */}
            <View style={styles.card}>
              <UseInput
                topLabelColor={COLORS.primary}
                control={control}
                name="firstname"
                topLabel="First Name"
                placeholder="Enter first name"
                required
              />

              <UseInput
                control={control}
                topLabelColor={COLORS.primary}
                name="lastname"
                topLabel="Last Name"
                placeholder="Enter last name"
                required
              />

              <UseInput
                control={control}
                name="userphone"
                topLabel="Phone"
                placeholder="Phone number"
                keyboardType="phone-pad"
                required
                topLabelColor={COLORS.primary}
              />

              <UseInput
                control={control}
                name="useremail"
                topLabel="Email"
                placeholder="Email address"
                required
                topLabelColor={COLORS.primary}
              />

              {/* PASSWORD */}
              <UseInput
                control={control}
                name="password"
                topLabel="Password"
                placeholder="Password"
                secureTextEntry={!showPassword}
                topLabelColor={COLORS.primary}
                required
                renderRightIcon={{
                  type: 'ionicon',
                  name: showPassword ? 'eye-off-outline' : 'eye-outline',
                  size: 18,
                  color: COLORS.gray,
                  onPress: () => setShowPassword(prev => !prev),
                }}
              />

              {/* CONFIRM PASSWORD */}
              <UseInput
                control={control}
                name="confirmPassword"
                topLabel="Confirm Password"
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                topLabelColor={COLORS.primary}
                required
                rules={{
                  validate: (v: string) =>
                    v === watch('password') || 'Passwords do not match',
                }}
                renderRightIcon={{
                  type: 'ionicon',
                  name: showConfirmPassword ? 'eye-off-outline' : 'eye-outline',
                  size: 18,
                  color: COLORS.gray,
                  onPress: () =>
                    setShowConfirmPassword(prev => !prev),
                }}
              />

              <TouchableComponent
                style={styles.btn}
                disabled={loading}
                onPress={handleSubmit(onSubmit)}
              >
                <Label
                  labelContent={loading ? 'Please wait...' : 'Sign Up'}
                  family={FONTS.AxiformaSemiBold}
                  color={COLORS.white}
                />
              </TouchableComponent>
            </View>

            {/* LOGIN LINK */}
            <View style={styles.bottomRow}>
              <Label labelContent="Already have an account? " size={13} />
              <TouchableComponent onPress={() => navigation.navigate('SignIn')}>
                <Label
                  labelContent="Sign In"
                  size={13}
                  family={FONTS.AxiformaSemiBold}
                  color={COLORS.primary}
                />
              </TouchableComponent>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 40,
  },
  logoWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  titleBlock: {
    alignItems: 'center',
    marginVertical: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    elevation: 8,
  },
  btn: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  logoImage: {
    width: 200,
    height: 200,
  },
});
  
