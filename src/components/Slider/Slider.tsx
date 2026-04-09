import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../constants';

const { width } = Dimensions.get('window');

interface SliderProps {
  images: string[];
  height?: number;
}

const Slider: React.FC<SliderProps> = ({ images, height = 180 }) => {
  return (
    <View style={[styles.container, { height }]}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        loop
        showsPagination
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {images.map((url, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default Slider;
const styles = StyleSheet.create({
  container: {
    width: width - 32,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.white,

    // Shadow
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },

  card: {
    flex: 1,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  dot: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },

  activeDot: {
    backgroundColor: COLORS.primary,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
