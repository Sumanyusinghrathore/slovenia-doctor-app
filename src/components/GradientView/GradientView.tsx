import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {genericStyles} from '../../constants';

type Point = { x: number; y: number };

interface GradientViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  start?: Point;
  end?: Point;
}

const GradientView: React.FC<GradientViewProps> = ({children, style, colors, start, end}) => {
  return (
    <LinearGradient
      start={start}
      end={end}
      style={[genericStyles.fill, {...(style as any)}]}
      colors={colors ?? ['#EAF6FF', '#FFFFFF', '#EAF6FF']}>
      {children}
    </LinearGradient>
  );
};

export default GradientView;
