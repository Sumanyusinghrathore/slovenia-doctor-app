import React from 'react';
import {Icon, IconProps} from '@rneui/themed';
import {StyleProp, ViewStyle, TextStyle, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';
import TouchableComponent from './TouchableComponent';

type SelectIconProps = Partial<{
  size: number;
  color: string;
  onPress: () => void;
  containerStyle: StyleProp<ViewStyle>;
  name: string;
  type: IconProps['type'];
  touchStyle: StyleProp<ViewStyle>;
  reverse: boolean;
  iconStyle: StyleProp<ViewStyle | TextStyle>;
  disabled: boolean;
}>;

const SelectIcon: React.FC<SelectIconProps> = ({
  size = 25,
  color = COLORS.black,
  onPress,
  containerStyle = {},
  name = '',
  type = 'ionicon',
  touchStyle = {},
  reverse = false,
  iconStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableComponent
      onPress={onPress ?? (() => {})} // Default to a no-op function
      disabled={disabled ?? !onPress}
      style={touchStyle}>
      <Icon
        name={name}
        reverse={reverse}
        size={size}
        style={
          StyleSheet.flatten(iconStyle) as ViewStyle | TextStyle | undefined
        }
        type={type}
        color={color}
        containerStyle={containerStyle}
      />
    </TouchableComponent>
  );
};

export default SelectIcon;
