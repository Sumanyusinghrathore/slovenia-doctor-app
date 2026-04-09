import React, { useMemo } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useForm, useWatch } from 'react-hook-form';

import { COLORS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import CustomHeader from '../../../components/Header/CustomHeader';
import { endpoints, fetchData } from '../../../helper/function';
import AppButton from '../../../components/CustomButton/AppButton';
import Loader from '../../../components/Loader/Loader';
import UseDropDown from '../../../components/Hook/UseDropDown';

/* ---------- TYPES ---------- */

interface PriceItem {
  type?: string;
  price?: string;
}

interface AdventureItem {
  id?: string;
  name?: string;
  image?: string;
  location?: string;
  description?: string;
  price?: PriceItem[];
}

/* ---------- SCREEN ---------- */

const ViewAdventure = () => {
  const navigation = useNavigation<any>();

  /* ✅ react-hook-form */
  const { control, reset } = useForm({
    defaultValues: {
      city: null,
    },
  });

  /* ✅ WATCH SELECTED CITY */
  const selectedCity = useWatch({
    control,
    name: 'city',
  });

  /* ---------- API ---------- */
  const { data, isLoading } = useQuery(['view-adventure-packages'], () =>
    fetchData(endpoints.VIEW_ADVENTURE_PACKAGES, '', '', 'get', true),
  );

  /* ---------- SAFE DATA ---------- */
  const adventures: AdventureItem[] =
    data?.data?.filter((item: AdventureItem) => item?.name) ?? [];

  /* ---------- CITY OPTIONS ---------- */
  const cityOptions = useMemo(() => {
    const uniqueCities = Array.from(
      new Set(adventures.map(item => item?.location).filter(Boolean)),
    );

    return uniqueCities.map(city => ({
      id: city as string,
      name: city as string,
    }));
  }, [adventures]);

  /* ---------- FILTER ---------- */
  const filteredAdventures = useMemo(() => {
    if (!selectedCity) return adventures;
    return adventures.filter(item => item?.location === selectedCity);
  }, [adventures, selectedCity]);

  /* ---------- CARD ---------- */
  const renderCard = ({ item }: { item: AdventureItem }) => {
    const price = item?.price?.[0]?.price;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('TrendingDetails', { camp: item })}
      >
        <Image
          source={{
            uri:
              item?.image ||
              'https://via.placeholder.com/300x200.png?text=Adventure',
          }}
          style={styles.image}
        />

        {!!price && (
          <View style={styles.priceTag}>
            <Label size={12} labelContent={`₹ ${price}`} color="#F97316" />
          </View>
        )}

        <View style={styles.cardBody}>
          <Label
            size={15}
            labelContent={item?.name ?? 'Adventure'}
            numberOfLines={1}
          />

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.MoodyBlue}
            />
            <Label
              size={12}
              labelContent={item?.location ?? 'Unknown'}
              color="#6B7280"
            />
          </View>

          <Label
            size={12}
            labelContent={item?.description ?? ''}
            numberOfLines={2}
            mt={6}
            color="#4B5563"
          />

          <AppButton
            title="View Details"
            containerStyle={styles.viewButton}
            onPress={() =>
              navigation.navigate('TrendingDetails', { camp: item })
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      {/* <CustomHeader title="Adventures" /> */}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* ✅ CITY DROPDOWN */}
          <View style={styles.dropdownWrapper}>
              <UseDropDown
                name="city"
                control={control}
                data={cityOptions}
                placeholder="Filter by City"
                labelField="name"
                valueField="id"
                placeholderStyle={{ color: COLORS.black }}
                dropDownStyle={{borderColor: COLORS.black,
                  borderWidth: 2,
                  borderRadius: 20,
                  backgroundColor: COLORS.white,}}

              />
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => reset({ city: null })}
              activeOpacity={1}
            >
              <Label labelContent="Clear" size={14} mv={5} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredAdventures}
            keyExtractor={(item, index) => item?.id ?? index.toString()}
            renderItem={renderCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Label
                  size={13}
                  labelContent="No adventures found"
                  color="#6B7280"
                />
              </View>
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ViewAdventure;

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F3F4F6',
  },

  dropdownWrapper: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 170,
  },

  priceTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#FFEDD5',
  },

  cardBody: {
    padding: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  viewButton: {
    marginTop: 10,
  },

  emptyBox: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  filterRow: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },

  clearButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
});
