import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ScrollView,
} from 'react-native';
import { COLORS, FONTS } from '../../constants';
import Label from '../Label/Labels';

export interface AdventureItem {
  id: string;
  title: string;
  description: string;
}

export interface AdventureSection {
  id: string;
  icon: string;
  title: string;
  items: AdventureItem[];
}

interface AdventureSectionsProps {
  sections: AdventureSection[];
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle; // still supported – passed to Label style
}

const AdventureSections: React.FC<AdventureSectionsProps> = ({
  sections,
  containerStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {sections.map(section => (
        <View key={section.id} style={styles.sectionContainer}>
          {/* Section header */}
          <View style={styles.sectionHeader}>
            <View style={styles.iconBadge}>
              <Label
                labelContent={section.icon}
                size={18}
                align="center"
                family={FONTS.AxiformaRegular}
                color={COLORS.black}
              />
            </View>

            <Label
              labelContent={section.title}
              size={16}
              align="left"
              family={FONTS.AxiformaBold}
              color="#111827"
              // @ts-ignore – assuming Label accepts style prop
              style={[styles.sectionTitle, titleStyle]}
            />
          </View>

          {/* Horizontal cards */}
          <View style={styles.cardsRow}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsScrollContent}
            >
              {section.items.map(item => (
                <View key={item.id} style={styles.card}>
                  {/* Card title (Bold) */}
                  <View style={styles.cardTitleWrapper}>
                    <Label
                      labelContent={item.title}
                      size={14}
                      align="left"
                      family={FONTS.AxiformaBold}
                      color="#111827"
                    />
                  </View>

                  {/* Card subtitle / description (Regular) */}
                  <Label
                    labelContent={item.description}
                    size={12}
                    align="left"
                    family={FONTS.AxiformaRegular}
                    color="#4B5563"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      ))}
    </View>
  );
};

export default AdventureSections;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sectionTitle: {
    // layout-related styles only; font handled by Label
  },

  cardsRow: {
    marginTop: 4,
  },
  cardsScrollContent: {
    paddingRight: 12,
    paddingLeft: 20,
  },

  card: {
    width: 260,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginRight: 14,
    backgroundColor: COLORS.borderColor,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardTitleWrapper: {
    marginBottom: 8,
  },
});
