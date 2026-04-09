import {StyleSheet, View} from 'react-native';
import React from 'react';

import { ReactNode, CSSProperties } from 'react';
import { ViewStyle } from 'react-native';

interface CommonContainerProps {
  style?: ViewStyle & CSSProperties;
  children?: ReactNode;
}

const CommonContainer = ({children, style}: CommonContainerProps) => {
  return <View style={[styles.container, {...style}]}>{children}</View>;
};

export default CommonContainer;

const styles = StyleSheet.create({
  container: {backgroundColor: '#ffffff', flex: 1},
});
