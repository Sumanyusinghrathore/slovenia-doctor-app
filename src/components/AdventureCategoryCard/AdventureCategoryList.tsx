import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQueries } from 'react-query';
import { COLORS, FONTS } from '../../constants';
import { endpoints, fetchData } from '../../helper/function';
import { CATEGORY_ICONS } from '../../utils/categoryIcons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;

interface SubCategory {
  name: string;
  count: number;
  image: string;
}

interface Category {
  category: string;
  subcategories: SubCategory[];
}

const AdventureCategorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();

  const results = useQueries([
    {
      queryKey: ['sub-categories'],
      queryFn: () =>
        fetchData(
          endpoints.GET_SUB_CATEGORY_ADVENTUERS,
          '',
          '',
          'get',
          true,
        ),
    },
  ]);

  const isLoading = results[0].isLoading;
  const apiData: Category[] = results[0]?.data?.data || [];

  useEffect(() => {
    if (apiData.length > 0) setActiveIndex(0);
  }, [apiData]);

  const activeCategory = apiData[activeIndex];

  if (isLoading) {
    return (
      <View style={{ padding: 30 }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ---------------- CATEGORY ---------------- */}
      <FlatList
        data={apiData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => item.category + index}
        contentContainerStyle={styles.categoryRow}
        renderItem={({ item, index }) => {
          const isActive = index === activeIndex;
          const icon =
            CATEGORY_ICONS[item.category] || 'compass-outline';

          return (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.categoryWrapper}
              onPress={() => setActiveIndex(index)}
            >
              <View
                style={[
                  styles.diamond,
                  isActive && styles.diamondActive,
                ]}
              >
                <View style={styles.innerDiamond}>
                  <Icon
                    name={icon}
                    size={28}
                    color={isActive ? COLORS.white : COLORS.primary}
                  />
                </View>
              </View>

              <Text
                style={[
                  styles.categoryText,
                  isActive && styles.categoryTextActive,
                ]}
                numberOfLines={2}
              >
                {item.category}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* ---------------- SUB CATEGORY ---------------- */}
      {activeCategory?.subcategories?.length > 0 ? (
        <FlatList
          data={activeCategory.subcategories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.name + index}
          contentContainerStyle={styles.subRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('PackageDetails', {
                  // ✅ FIX: send required data
                  subCategory: item.name,
                  category: activeCategory.category,
                })
              }
            >
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
                imageStyle={{ borderRadius: 18 }}
              >
                <View style={styles.overlay}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.count}>
                    {item.count} Packages
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>No activities available</Text>
      )}
    </View>
  );
};

export default AdventureCategorySection;

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,

    },

    /* CATEGORY */
    categoryRow: {
        paddingHorizontal: 16,
        paddingRight: 40,
        top: 20
    },
    categoryWrapper: {
        alignItems: 'center',
        marginRight: 20,
        paddingBottom: 20

    },

    /* 🔷 DIAMOND */
    diamond: {
        width: 70,
        height: 70,
        borderRadius: 20,
        transform: [{ rotate: '45deg' }],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.8,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        borderWidth: 1,
        borderColor: COLORS.transparent,
        marginBottom: 6,
    },
    diamondActive: {
        backgroundColor: COLORS.primary,
        transform: [{ rotate: '45deg' }, { scale: 1.05 }],
    },
    innerDiamond: {
        transform: [{ rotate: '-45deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.transparent,
    },

    categoryText: {
        marginTop: 10,
        fontSize: 12,
        lineHeight: 15,        // 👈 MULTI-LINE LOOK CLEAN
        color: COLORS.primary,
        fontFamily: FONTS.AxiformaBold,
        textAlign: 'center',
        maxWidth: 90,          // 👈 PREVENT TOO WIDE TEXT
    },

    categoryTextActive: {
        color: COLORS.MoodyBlue,
    },

    /* SUB CATEGORY */
    subRow: {
        paddingLeft: 16,
        paddingTop: 22,
    },
    card: {
        width: CARD_WIDTH,
        height: 180,
        marginRight: 14,
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.45)',
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONTS.AxiformaBold,
    },
    count: {
        marginTop: 4,
        color: COLORS.white,
        fontSize: 12,
        opacity: 0.9,
    },
    emptyText: {
        marginTop: 20,
        marginLeft: 16,
        color: COLORS.gray,
        fontSize: 13,
    },
});
