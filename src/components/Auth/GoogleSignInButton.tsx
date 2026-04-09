import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Label from '../Label/Labels';
import TouchableComponent from '../Routine/TouchableComponent';
import { COLORS, FONTS } from '../../constants';
import { googleSignIn } from '../../services/googleAuth';
import renderToast from '../../helper/renderToast';
import { useToast } from 'react-native-toast-notifications';
import { useApp, navigationStateType } from '../../context/AppContext';

type Props = {
  title?: string;
};

const GoogleSignInButton: React.FC<Props> = ({
  title = 'Continue with Google',
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { setNavigationState, setUserData } = useApp();


  const handleGoogleLogin = async () => {
  try {
    setLoading(true);

    const token = await googleSignIn(); // 🔥 token received

    setUserData({ token }); // 🔥 MOST IMPORTANT LINE
    setNavigationState(navigationStateType.HOME);

    renderToast(toast, 'Login successful', 'success');
  } catch (error: any) {
    renderToast(
      toast,
      error?.message ?? 'Google Sign-In failed',
      'danger',
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <TouchableComponent
      style={styles.button}
      onPress={handleGoogleLogin}
      disabled={loading}
    >
      <View style={styles.circle}>
        <Label
          labelContent="G"
          family={FONTS.AxiformaBlack}
          size={18}
          color={COLORS.primary}
          mb={0}
        />
      </View>

      <Label
        labelContent={loading ? 'Please wait...' : title}
        family={FONTS.AxiformaSemiBold}
        size={13}
        color={COLORS.black}
        mb={0}
      />
    </TouchableComponent>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
});
