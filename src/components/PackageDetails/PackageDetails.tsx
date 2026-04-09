import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';

import { endpoints, fetchData } from '../../helper/function';
import { COLORS, FONTS } from '../../constants';
import CustomHeader from '../Header/CustomHeader';

/* ---------------- TYPES ---------------- */

interface PriceItem {
  type: string;
  price: string;
}

interface PackageItem {
  id: string;
  name: string;
  image: string;
  price: PriceItem[];
  subcategory: string;
  location?: string;
  city?: string;
  rating?: number;
}

/* ---------------- SCREEN ---------------- */

const PackageList = () => {
  const route = useRoute<any>();
  const { subCategory } = route.params;
  const navigation = useNavigation<any>();

  /* ---------------- FILTER STATES ---------------- */

  const [filterVisible, setFilterVisible] = useState(false);

  const [priceSort, setPriceSort] = useState<'low' | 'high' | null>(null);
  const [stateValue, setStateValue] = useState<string | null>(null);
  const [cityValue, setCityValue] = useState<string | null>(null);

  const [priceOpen, setPriceOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  /* ---------------- API ---------------- */

  const { data, isLoading } = useQuery(
    ['packages', subCategory],
    () =>
      fetchData(
        endpoints.GET_ALL_PACKAGE_DETAILS,
        '',
        '',
        'get',
        true,
      ),
  );

  const allPackages: PackageItem[] = data?.data || [];

  /* ---------------- UNIQUE STATES / CITIES ---------------- */

  const stateOptions = useMemo(() => {
    const states = Array.from(
      new Set(allPackages.map(i => i.location).filter(Boolean)),
    );
    return states.map(s => ({ label: s!, value: s! }));
  }, [allPackages]);

  const cityOptions = useMemo(() => {
    const cities = Array.from(
      new Set(
        allPackages
          .filter(i => (stateValue ? i.location === stateValue : true))
          .map(i => i.city)
          .filter(Boolean),
      ),
    );
    return cities.map(c => ({ label: c!, value: c! }));
  }, [allPackages, stateValue]);

  /* ---------------- FILTER + SORT ---------------- */

  const filteredPackages = useMemo(() => {
    let list = allPackages.filter(
      item =>
        item.subcategory?.toLowerCase() ===
        subCategory?.toLowerCase(),
    );

    if (stateValue) {
      list = list.filter(i => i.location === stateValue);
    }

    if (cityValue) {
      list = list.filter(i => i.city === cityValue);
    }

    if (priceSort) {
      list = [...list].sort((a, b) => {
        const priceA = Number(a.price?.[0]?.price || 0);
        const priceB = Number(b.price?.[0]?.price || 0);
        return priceSort === 'low'
          ? priceA - priceB
          : priceB - priceA;
      });
    }

    return list;
  }, [allPackages, subCategory, stateValue, cityValue, priceSort]);

  /* ---------------- LOADER ---------------- */

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={COLORS.primary}
        style={{ marginTop: 40 }}
      />
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <>
      <CustomHeader
        title={subCategory}
        rightVectorIcon={{ name: 'filter-outline', size: 24 }}
        onRight={() => setFilterVisible(true)}
      />

      <FlatList
        data={filteredPackages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.card}
            onPress={() =>
              navigation.navigate('TrendingDetails', { camp: item })
            }
          >
            <ImageBackground
              source={{ uri: item.image }}
              style={styles.image}
              imageStyle={styles.imageRadius}
            >
              <View style={styles.ratingBox}>
                <Icon name="star" size={13} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {(item.rating || 5).toFixed(1)}
                </Text>
              </View>

              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
                style={styles.overlay}
              >
                <Text style={styles.title}>{item.name}</Text>

                <View style={styles.locationRow}>
                  <Icon name="location-outline" size={13} color="#bbb" />
                  <Text style={styles.location}>
                    {item.city || ''} {item.location || ''}
                  </Text>
                </View>

                <View style={styles.bottomRow}>
                  <View>
                    <Text style={styles.price}>
                      ₹{item.price?.[0]?.price}
                    </Text>
                    <Text style={styles.perPerson}>per person</Text>
                  </View>

                  <View style={styles.bookBtn}>
                    <Text style={styles.bookText}>Book Now</Text>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No packages found for {subCategory}
          </Text>
        }
      />

      {/* ---------------- FILTER MODAL ---------------- */}

      <Modal visible={filterVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Filter</Text>

            {/* Price */}
            <Text style={styles.filterLabel}>Price</Text>
            <DropDownPicker
              open={priceOpen}
              setOpen={setPriceOpen}
              value={priceSort}
              setValue={setPriceSort}
              items={[
                { label: 'Low to High', value: 'low' },
                { label: 'High to Low', value: 'high' },
              ]}
              placeholder="Sort by price"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              selectedItemContainerStyle={styles.dropdownSelected}
              placeholderStyle={styles.dropdownPlaceholder}
              ArrowDownIconComponent={() => (
                <Icon name="chevron-down" size={18} color="#666" />
              )}
              ArrowUpIconComponent={() => (
                <Icon name="chevron-up" size={18} color="#666" />
              )}
              TickIconComponent={() => (
                <Icon name="checkmark" size={18} color={COLORS.primary} />
              )}
              zIndex={3000}
            />

            {/* State */}
            <Text style={styles.filterLabel}>State</Text>
            <DropDownPicker
              open={stateOpen}
              setOpen={setStateOpen}
              value={stateValue}
              setValue={setStateValue}
              items={stateOptions}
              placeholder="Select state"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              selectedItemContainerStyle={styles.dropdownSelected}
              placeholderStyle={styles.dropdownPlaceholder}
              zIndex={2000}
            />

            {/* City */}
            <Text style={styles.filterLabel}>City</Text>
            <DropDownPicker
              open={cityOpen}
              setOpen={setCityOpen}
              value={cityValue}
              setValue={setCityValue}
              items={cityOptions}
              placeholder="Select city"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              selectedItemContainerStyle={styles.dropdownSelected}
              placeholderStyle={styles.dropdownPlaceholder}
              zIndex={1000}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => {
                  setPriceSort(null);
                  setStateValue(null);
                  setCityValue(null);
                  setFilterVisible(false);
                }}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text style={styles.applyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PackageList;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 28,
    borderRadius: 28,
    backgroundColor: '#000',
    overflow: 'hidden',

  },
  image: {
    height: 340,
    justifyContent: 'flex-end',
  },
  imageRadius: {
    borderRadius: 28,
  },
  ratingBox: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#fff',
    marginLeft: 4,
    fontFamily: FONTS.AxiformaBold,
  },
  overlay: {
    padding: 18,
    paddingTop: 60,
  },
  title: {
    fontSize: 21,
    color: '#fff',
    fontFamily: FONTS.AxiformaBold,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  location: {
    color: '#bbb',
    marginLeft: 4,
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 21,
    color: '#fff',
    fontFamily: FONTS.AxiformaBold,
  },
  perPerson: {
    fontSize: 11,
    color: '#aaa',
  },
  bookBtn: {
    backgroundColor: '#4BB8D3',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 16,
  },
  bookText: {
    color: '#fff',
    fontFamily: FONTS.AxiformaBold,
  },
  empty: {
    textAlign: 'center',
    marginTop: 60,
    color: COLORS.gray,
  },

  /* Modal */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONTS.AxiformaBold,
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    marginTop: 8,
  },

  /* Dropdown UI */
  dropdown: {
    borderRadius: 14,
    borderColor: '#E6E6E6',
    backgroundColor: '#FAFAFA',
    minHeight: 48,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  dropdownContainer: {
    borderRadius: 14,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: FONTS.AxiformaMedium,
    color: '#333',
  },
  dropdownSelected: {
    backgroundColor: '#F0FAFD',
  },
  dropdownPlaceholder: {
    color: '#999',
    fontSize: 13,
    fontFamily: FONTS.AxiformaRegular,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  applyText: {
    color: COLORS.primary,
    fontSize: 15,
    fontFamily: FONTS.AxiformaBold,
  },
});
