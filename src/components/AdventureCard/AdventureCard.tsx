import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Label from '../Label/Labels';
import { COLORS, FONTS } from '../../constants';

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.round(width * 0.43);
const CARD_HEIGHT = Math.round(CARD_WIDTH * 1.4);

type AdventureCardProps = {
  title: string;
  packagesCount?: number;
  image: any;
  onPress?: () => void;
  style?: object;
};

const AdventureCard: React.FC<AdventureCardProps> = ({
  title,
  packagesCount = 0,
  image,
  onPress,
  style,
}) => {
  if (packagesCount === 0) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <ImageBackground
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        {/* 🔥 Gradient Overlay */}
        <LinearGradient
          colors={[
            'rgba(0,0,0,0)',
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.9)',
          ]}
          style={styles.gradient}
        />

        {/* Text */}
        <View style={styles.textWrap}>
          <Label
            color={COLORS.white}
            size={16}
            family={FONTS.AxiformaBold}
            numberOfLines={2}
            mb={6}
            labelContent={title}
          />
          <Label
            color={COLORS.white}
            size={14}
            labelContent={`${packagesCount} Packages`}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AdventureCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginHorizontal: 12,
    marginVertical: 20,
    borderRadius: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 14,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textWrap: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    zIndex: 2,
  },
});
