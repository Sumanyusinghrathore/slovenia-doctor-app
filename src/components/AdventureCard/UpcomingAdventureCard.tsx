// UpcomingAdventureCard.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import Label from '../Label/Labels';
import Icon from 'react-native-vector-icons/Ionicons';
import { FONTS, COLORS } from '../../constants';

const { width } = Dimensions.get('window');

const CARD_WIDTH = Math.round(width * 0.5);

// ⭐ FIXED SAME HEIGHT FOR ALL CARDS
const FIXED_IMAGE_HEIGHT = 180; // <--- All cards will have same height

type UpcomingAdventureCardProps = {
  id?: string | number;
  image: string | ImageSourcePropType;
  title: string;
  location?: string;
  rating?: number;
  prices: Array<{ type?: string; price: number | string }>;
  onPress?: () => void;
  style?: object;
};

const clampRating = (r?: number) =>
  Math.max(0, Math.min(5, Math.round((r ?? 0) * 2) / 2));

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  const stars = [];

  for (let i = 0; i < full; i++) {
    stars.push(
      <Icon key={`full-${i}`} name="star" size={16} color="#f5c542" />,
    );
  }
  if (half === 1) {
    stars.push(<Icon key="half" name="star-half" size={16} color="#f5c542" />);
  }
  for (let i = 0; i < empty; i++) {
    stars.push(
      <Icon key={`empty-${i}`} name="star-outline" size={16} color="#f5c542" />,
    );
  }

  return stars;
};

const UpcomingAdventureCard: React.FC<UpcomingAdventureCardProps> = ({
  image,
  title,
  location,
  rating = 0,
  prices,
  onPress,
  style,
}) => {
  const r = clampRating(rating);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <ImageBackground
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      />
      <View style={styles.info}>
        {/* TITLE */}
        <Label
          size={13}
          family={FONTS.AxiformaBold}
          color={COLORS.black}
          numberOfLines={2}
          labelContent={title}
        />
        {/* LOCATION */}
        {location && (
          <Label
            mt={4}
            size={14}
            family={FONTS.AxiformaLight}
            color={COLORS.black}
            labelContent={location}
          />
        )}
        {/* RATING */}
        {rating && <View style={styles.row}>{renderStars(r)}</View>}

        {/* PRICES */}
        {Array.isArray(prices) && prices.length > 0 ? (
          prices.map((p, index) => (
            <Label
              key={index}
              mt={6}
              size={14}
              family={FONTS.AxiformaBold}
              color={COLORS.black}
              labelContent={`${p?.type ?? 'Package'} - ₹${Number(p.price)}`}
            />
          ))
        ) : (
          <Label
            mt={6}
            size={13}
            family={FONTS.AxiformaRegular}
            color={COLORS.gray}
            labelContent="Price not available"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingAdventureCard;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    borderRadius: 12,
    marginTop: 15,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 5,
      },
    }),
  },

  image: {
    width: '100%',
    height: FIXED_IMAGE_HEIGHT, // ⭐ ALL CARDS SAME HEIGHT
  },

  imageStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  info: {
    paddingVertical: 14,
    paddingHorizontal: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});
