import { Pressable, StyleProp, ViewStyle } from 'react-native';
import React from 'react';

type Props = {
  onPress?: () => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

const TouchableComponent: React.FC<Props> = ({
  onPress,
  children,
  style = {},
  disabled,
}) => {
  return (
    <Pressable style={style} onPress={onPress} disabled={disabled}>
      {children}
    </Pressable>
  );
};

export default TouchableComponent;
