import React from 'react';
import { StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TouchableComponent from '../Routine/TouchableComponent';
import Label from '../Label/Labels';
import { COLORS } from '../../constants';
import { gradientColors } from '../../constants/theme';

type LinearButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  textSize?: number;
  linerStyle?: ViewStyle;
  changeColor?: string | string[]; // ✅ Can be single or array
  containerStyle?: ViewStyle;
  textFamily?: string;
  textColor?: string;
  buttonStyle?: ViewStyle;
  borderRadius?: number;
};

const LinearButton: React.FC<LinearButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  textSize = 14,
  linerStyle = {},
  changeColor,
  containerStyle,
  textFamily,
  textColor = COLORS.white,
  buttonStyle,
  borderRadius = 10,
}) => {
  const gradient = Array.isArray(changeColor)
    ? changeColor
    : gradientColors(changeColor);

  return (
    <TouchableComponent
      onPress={onPress}
      disabled={disabled}
      style={containerStyle}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={gradient}
        style={[
          styles.buttonStyle,
          { borderRadius },
          linerStyle,
          buttonStyle,
        ]}>
        {loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Label
            mh={5}
            align="center"
            family={textFamily}
            color={textColor}
            labelContent={title}
            size={textSize}
          />
        )}
      </LinearGradient>
    </TouchableComponent>
  );
};

export default LinearButton;

const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
