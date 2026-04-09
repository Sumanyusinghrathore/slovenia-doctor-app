import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import {Image} from '@rneui/themed';
import {COLORS} from '../../constants';

interface CustomImgProps {
  source: any; // Use `ImageSourcePropType` if the source is limited to images
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  contain?: boolean;
  image?: boolean;
  PlaceholderContent?: any;
}

const CustomImg: React.FC<CustomImgProps> = ({
  source,
  style,
  containerStyle,
  onPress,
  contain = false,
  image = false,
  PlaceholderContent,
}) => {
  return (
    <Image
      style={style}
      onPress={onPress}
      source={source}
      containerStyle={containerStyle}
      resizeMode={contain ? 'contain' : 'cover'}
      PlaceholderContent={
        PlaceholderContent ?? <ActivityIndicator color={COLORS.primary} />
      }
    />
  );
};

export default CustomImg;
