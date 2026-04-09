import React from 'react';
import {
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { Button, ButtonProps } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS } from '../../constants';

interface GradientButtonProps {
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  title?: string;
  borderRadius?: number;
  btnType?: ButtonProps['type'];
}

const GradientButton: React.FC<GradientButtonProps> = ({
  containerStyle,
  buttonStyle,
  titleStyle,
  disabled = false,
  onPress = () => {},
  loading = false,
  title = '',
  borderRadius = 30,
  btnType = 'clear', // ✅ IMPORTANT
}) => {
  return (
    <LinearGradient
      colors={[
        COLORS.gradientprimary,
        COLORS.gradientprimary1,
        COLORS.gradientprimary2,
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientBackground, { borderRadius, marginVertical: 20 }]}
    >
      <Button
        title={title}
        type={btnType}
        loading={loading}
        disabled={disabled}
        onPress={onPress}
        activeOpacity={0.9}
        containerStyle={[styles.buttonContainer, containerStyle]}
        buttonStyle={[styles.transparentButton, { borderRadius }, buttonStyle]}
        titleStyle={[
          styles.titleStyle,
          titleStyle,
          { fontFamily: FONTS.AxiformaBold },
        ]}
      />
    </LinearGradient>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  gradientBackground: {
    height: 50,
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
  },
  transparentButton: {
    backgroundColor: 'transparent', // 🔥 KEY FIX
    height: '100%',
  },
  titleStyle: {
    fontSize: 16,
    color: COLORS.white,
  },
});
