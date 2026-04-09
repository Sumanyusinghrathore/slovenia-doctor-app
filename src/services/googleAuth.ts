import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, googleLoginApi, postData } from '../helper/function';

GoogleSignin.configure({
  webClientId: '1038179953764-cfo542o0c56muilkvqb92a65c5cn3qtr.apps.googleusercontent.com',
  offlineAccess: true, // ✅ keep false unless you really need refresh tokens
  forceCodeForRefreshToken: true,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    const userInfo: any = await GoogleSignin.signIn();
    const idToken = userInfo?.data?.idToken;

    if (!idToken) {
      throw new Error('Google ID token missing');
    }

    const response = await googleLoginApi(idToken);

    if (!response?.success) {
      throw new Error(response?.message || 'Google login failed');
    }

    // ✅ ONLY return token
    return response.data.useraccess;
  } catch (error) {
    console.log('Google Sign-In Error:', error);
    throw error;
  }
};

