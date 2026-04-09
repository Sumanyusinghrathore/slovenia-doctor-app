import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../../constants';
import Label from '../Label/Labels';
import TouchableComponent from '../Routine/TouchableComponent';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.5;

export interface CampItem {
  id?: string;
  image: string;
  price: number;
  title: string;
  location: string;
  description: string;
}

interface CampCardProps {
  item: CampItem;
  onPress: (item: CampItem) => void;
}

const CampCard = ({ item, onPress }: CampCardProps) => {
  return (
    <View style={styles.wrapper}>
      {/* Card */}
      <TouchableComponent style={styles.card} onPress={() => onPress(item)}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.priceTag}>
            <Label
              textStyle={styles.priceText}
              labelContent={`₹ ${item.price}`}
            ></Label>
          </View>
        </View>

        <View style={styles.content}>
          <Label
            labelContent={item.title}
            textStyle={styles.title}
            numberOfLines={1}
          ></Label>

          <View style={styles.locationRow}>
            <Icon name="location-sharp" size={14} color="#ff5a5f" />
            <Label
              labelContent={item.location}
              textStyle={styles.location}
              numberOfLines={1}
            ></Label>
          </View>

          <Label
            labelContent={item.description}
            numberOfLines={2}
            textStyle={styles.description}
          ></Label>
        </View>
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    width: CARD_WIDTH,
    marginHorizontal: 10,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 16 / 11,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#004aad',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  priceText: {
    color: '#fff',
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: '#666',
    marginLeft: 3,
    flex: 1,
  },
  description: {
    fontSize: 12,
    color: '#777',
    marginTop: 6,
  },
});

export default CampCard;
