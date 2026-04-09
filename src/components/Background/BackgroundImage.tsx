import {ImageBackground, ImageStyle, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {genericStyles} from '../../constants';

// Define prop types
interface BackgroundImageProps {
  style?: StyleProp<ViewStyle>;
  changeBg?: any; // Can be a source or `null`
  children?: React.ReactNode;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  imageStyle?: StyleProp<ImageStyle>;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  style,
  changeBg,
  children,
  resizeMode = 'cover',
  imageStyle,
}) => {
  return (
    <ImageBackground
      resizeMode={resizeMode}
      imageStyle={imageStyle}
      style={[genericStyles.fill, style]}
      source={changeBg}>
      {children}
    </ImageBackground>
  );
};

export default BackgroundImage;
