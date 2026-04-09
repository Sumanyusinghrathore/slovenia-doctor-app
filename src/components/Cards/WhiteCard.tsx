import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, genericStyles} from '../../constants';

interface WhiteCardProps {
  children: any;
  style: StyleProp<ViewStyle>;
}

const WhiteCard: React.FC<WhiteCardProps> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default WhiteCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
});
