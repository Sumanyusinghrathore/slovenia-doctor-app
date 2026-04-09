import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CustomHeader from '../../../components/Header/CustomHeader';
import Label from '../../../components/Label/Labels';
import { COLORS, genericStyles } from '../../../constants';
import { fetchData, endpointWithId } from '../../../helper/function';

/* ---------- TYPES ---------- */

interface PriceItem {
  type: string;
  price: string;
}

interface PackageItem {
  id: string;
  slug: string;
  name: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  tags: string[];
  price: PriceItem[];
}

type ViewPackageRouteParams = {
  ViewPackages: {
    slug: string;
  };
};

/* ---------- SCREEN ---------- */

const ViewPackages = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<ViewPackageRouteParams, 'ViewPackages'>>();
  const slug = route.params?.slug;

  /* ---------- API ---------- */
  const { data, isLoading } = useQuery(
    ['vendor-packages', slug],
    () =>
      fetchData(endpointWithId(slug!).GET_VENDOR_PACKAGES, '', '', 'get', true),
    {
      enabled: !!slug, // ✅ prevents crash
    },
  );

  const packages: PackageItem[] = data?.data ?? [];

  /* ---------- HELPERS ---------- */
  const formatSlugToTitle = (slug?: string) => {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /* ---------- CARD ---------- */
  const renderItem = ({ item }: { item: PackageItem }) => {
    const startingPrice = item.price?.[0]?.price;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate('TrendingDetails', {
            camp: item,
          })
        }
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        {/* PRICE BADGE */}
        {startingPrice && (
          <View style={styles.priceBadge}>
            <Label
              size={12}
              color={COLORS.white}
              labelContent={`₹${startingPrice}`}
            />
          </View>
        )}

        <View style={styles.cardContent}>
          <Label size={16} labelContent={item.name} />
          <Label
            size={13}
            color={COLORS.gray}
            labelContent={item.location}
            mv={2}
          />

          <Label
            size={13}
            color={COLORS.newGray}
            labelContent={item.description}
            numberOfLines={2}
            mv={6}
          />

          {/* TAGS */}
          <View style={styles.tagsContainer}>
            {item.tags?.map((tag, index) => (
              <View key={index.toString()} style={styles.tag}>
                <Label size={11} labelContent={tag} />
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title={`Packages ${formatSlugToTitle(slug)}`} /> */}

      <FlatList
        data={packages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          !isLoading ? (
            <Label align="center" size={14} labelContent="No packages found" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default ViewPackages;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  cardContent: {
    padding: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    marginRight: 6,
    marginBottom: 6,
  },
});
