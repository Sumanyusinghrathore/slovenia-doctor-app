import React, { useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

import UseInput from '../../../components/Hook/UseInput';
import Label from '../../../components/Label/Labels';
import { genericStyles, FONTS, COLORS } from '../../../constants';
import { useApp, navigationStateType } from '../../../context/AppContext';
import renderToast from '../../../helper/renderToast';
import AppButton from '../../../components/CustomButton/AppButton';
import { staffApi } from '../../../services/patientApi';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [loader, updateLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setNavigationState, setUserData } = useApp();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      updateLoader(true);

      const response = await staffApi.login(data.email.trim(), data.password);

      if (!['admin', 'doctor', 'compounder', 'patient'].includes(response.role)) {
        renderToast(
          toast,
          'Yeh app sirf patient, admin, doctor aur compounder workflows ke liye configured hai.',
          'danger',
        );
        return;
      }

      const loggedInUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.role,
        token: response.token,
      };

      setUserData(loggedInUser);
      await AsyncStorage.setItem('userData', JSON.stringify(loggedInUser));

      renderToast(toast, 'Login successful!', 'success');
      setNavigationState(navigationStateType.HOME);
    } catch (error: any) {
      console.error('Login Error:', error);
      renderToast(
        toast,
        error?.message ?? 'Something went wrong. Please try again.',
        'danger',
      );
    } finally {
      updateLoader(false);
    }
  };

  return (
    <SafeAreaView style={[genericStyles?.container || {}, styles.container]}>
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
            <View style={styles.logoWrapper}>
              <Image
                source={require('../../../assets/images/Jansevacare.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.titleBlock}>
              <Label
                labelContent="Welcome Back"
                family={FONTS.AxiformaSemiBold}
                size={22}
                color={COLORS.black}
                mb={4}
              />
              <Label
                labelContent="Login to access your staff workspace"
                family={FONTS.AxiformaRegular}
                size={13}
                color={COLORS.gray || '#777'}
                mb={0}
              />
            </View>

            <View style={styles.formCard}>
              <Label
                labelContent="Log In to Solvenia Staff"
                family={FONTS.AxiformaSemiBold}
                size={18}
                color={COLORS.black}
                mb={15}
              />

              <View style={styles.demoHint}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={COLORS.primary}
                />
                <Label
                  labelContent="Use only admin, doctor, or compounder credentials"
                  family={FONTS.AxiformaRegular}
                  size={12}
                  color={COLORS.primary}
                  mb={0}
                  textStyle={{ marginLeft: 8 }}
                />
              </View>

              <UseInput
                control={control}
                name="email"
                topLabel="Email"
                topLabelColor={COLORS.black}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                renderLeftIcon={{
                  type: 'ionicon',
                  name: 'mail-outline',
                  size: 18,
                  color: COLORS.gray,
                }}
                leftIconContainerStyle={{ marginRight: 8 }}
                inputContainerStyle={{ paddingLeft: 10 }}
                required
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Enter a valid email',
                  },
                }}
              />

              <UseInput
                control={control}
                name="password"
                topLabelColor={COLORS.black}
                topLabel="Password"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                inputContainerStyle={{ paddingLeft: 10 }}
                renderLeftIcon={{
                  type: 'ionicon',
                  name: 'lock-closed-outline',
                  size: 18,
                  color: COLORS.gray,
                }}
                leftIconContainerStyle={{ marginRight: 8 }}
                required
                renderRightIcon={{
                  type: 'ionicon',
                  name: showPassword ? 'eye-off-outline' : 'eye-outline',
                  onPress: () => setShowPassword(prev => !prev),
                }}
                rules={{
                  required: 'Password is required',
                }}
                containerStyle={{ marginTop: 12 }}
              />

              <AppButton
                title="Log In"
                onPress={handleSubmit(onSubmit)}
                loading={loader}
                buttonStyle={styles.loginButton}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
  logoImage: {
    width: 200,
    height: 200,
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
  demoHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF4FF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 18,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
