import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import CustomHeader from '../../../components/Header/CustomHeader';
import { fetchData, endpointWithId } from '../../../helper/function';
import AppButton from '../../../components/CustomButton/AppButton';
import Loader from '../../../components/Loader/Loader';

/* ---------- TYPES (MATCH BACKEND) ---------- */

interface PriceItem {
  type: string;
  price: string;
}

interface AdventureItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  images: string[];
  place: string;
  description: string;
  price: PriceItem[];
  category: string;
}

type RouteParams = {
  AdventureCategory: {
    categoryId: string;
    title: string;
  };
};

/* ---------- SCREEN ---------- */

const AdventureCategory = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, 'AdventureCategory'>>();

  const { categoryId, title } = route.params;
  const [search, setSearch] = useState('');

  /* ---------- API ---------- */
  const { data, isLoading } = useQuery(
    ['adventures-by-category', categoryId],
    () =>
      fetchData(
        endpointWithId(categoryId).ADVENTURES_BY_CATEGORY,
        '',
        '',
        'get',
        true,
      ),
    { enabled: !!categoryId },
  );

  // ✅ Correct data path
  const adventures: AdventureItem[] = data?.data ?? [];

  /* ---------- SEARCH ---------- */
  const filteredAdventures = useMemo(() => {
    if (!search) return adventures;

    return adventures.filter(item =>
      item.place.toLowerCase().includes(search.toLowerCase()),
    );
  }, [adventures, search]);

  /* ---------- CARD ---------- */
  const renderCard = ({ item }: { item: AdventureItem }) => {
    const price = item.price?.[0]?.price;

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() =>
          navigation.navigate('TrendingDetails', {
            camp: item,
          })
        }
      >
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />

          {/* Price */}
          {price && (
            <View style={styles.priceTag}>
              <Label
                size={12}
                labelContent={`₹ ${price}`}
                align="center"
                color="#F97316"
              />
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.cardBody}>
          <Label
            size={15}
            labelContent={item.name}
            numberOfLines={1}
            color="#111827"
          />

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.MoodyBlue}
            />
            <View style={{ marginLeft: 4 }}>
              <Label
                size={12}
                labelContent={item.place}
                numberOfLines={1}
                color="#6B7280"
              />
            </View>
          </View>

          <Label
            size={12}
            labelContent={item.description}
            numberOfLines={2}
            mt={6}
            color="#4B5563"
          />
          <AppButton
            containerStyle={styles.viewButton}
            title="View Details"
            onPress={() =>
              navigation.navigate('TrendingDetails', {
                camp: item,
              })
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      <CustomHeader title={title} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Ionicons
                name="search-outline"
                size={16}
                style={styles.searchIcon}
              />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Search adventures..."
                placeholderTextColor="#9CA3AF"
                style={styles.searchInput}
              />
            </View>
          </View>
          <FlatList
            data={filteredAdventures}
            keyExtractor={item => item.id}
            renderItem={renderCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              !isLoading ? (
                <View style={styles.emptyBox}>
                  <Label
                    size={13}
                    labelContent="Adventure coming soon"
                    color="#6B7280"
                    align="center"
                  />
                </View>
              ) : null
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default AdventureCategory;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    marginVertical: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 6,
    color: COLORS.MoodyBlue,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: COLORS.MoodyBlue,
    fontFamily: FONTS.AxiformaRegular,
  },

  // --- List / Cards ---
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 18,
    backgroundColor: COLORS.white,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 170,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  priceTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FFEDD5',
  },
  cardBody: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  viewButton: {
    marginTop: 10,
    paddingVertical: 10,
  },
  emptyBox: {
    paddingVertical: 40,
    alignItems: 'center',
  },
});
