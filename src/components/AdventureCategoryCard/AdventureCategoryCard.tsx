import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Label from '../Label/Labels';
import { COLORS, FONTS } from '../../constants';

export interface AdventureCategory {
  id: string;
  title: string;
  icon: string; // Ionicons name
  backgroundColor: string;
}

interface Props {
  item: AdventureCategory;
  onPress: (item: AdventureCategory) => void;
}

const AdventureCategoryCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.wrapper}
      onPress={() => onPress(item)}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <View
        style={[
          styles.diamond,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        {/* subtle inner ring to make icon feel more premium */}
        <View style={styles.innerDiamond}>
          <View style={styles.iconCircle}>
            <Icon name={item.icon} size={30} color={COLORS.primary} />
          </View>
        </View>
      </View>

      <Label
        mt={8}
        align="center"
        size={12}
        family={FONTS.AxiformaBlack}
        color={COLORS.primary}
        labelContent={item.title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginHorizontal: 12, // better gap between items
    minWidth: 80,
  },
  diamond: {
    width: 70,
    height: 70,
    borderRadius: 20,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.transparent,
  },
  innerDiamond: {
    transform: [{ rotate: '-45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
  },
});

export default AdventureCategoryCard;
