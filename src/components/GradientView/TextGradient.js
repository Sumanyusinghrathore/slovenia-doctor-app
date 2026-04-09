import React from 'react';
import {LinearGradientText} from 'react-native-linear-gradient-text';
import {genericStyles} from '../../constants';
import {gradientColors} from '../../constants/theme';

const TextGradient = ({textStyle, title, colors, reverse}) => {
  const end = reverse ? {x: 1, y: 0.01} : {x: -0.01, y: 0};
  const start = reverse ? {x: -0.01, y: 0} : {x: 1, y: 0.01};
  return (
    <LinearGradientText
      end={end}
      text={title}
      start={start}
      colors={gradientColors(colors)}
      textProps={{allowFontScaling: false}} // Optional
      textStyle={{...genericStyles.title500, ...textStyle}} // Optional
    />
  );
};

export default TextGradient;
