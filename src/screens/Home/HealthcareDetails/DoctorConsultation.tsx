import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import { DOCTOR_SPECIALTIES, PATIENT_DOCTORS } from '../../../config/patientDoctors';

const DoctorConsultation = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [doctors, setDoctors] = useState(PATIENT_DOCTORS);

  const filterDoctors = useCallback(() => {
    let filtered = PATIENT_DOCTORS;

    if (selectedSpecialty !== 'All') {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }

    if (searchQuery.trim()) {
      const normalized = searchQuery.toLowerCase();
      filtered = filtered.filter(
        doc =>
          doc.name.toLowerCase().includes(normalized) ||
          doc.specialty.toLowerCase().includes(normalized),
      );
    }

    setDoctors(filtered);
  }, [searchQuery, selectedSpecialty]);

  useEffect(() => {
    filterDoctors();
  }, [filterDoctors]);

  const renderDoctorCard = ({ item }: { item: typeof PATIENT_DOCTORS[number] }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
      style={styles.doctorCard}
    >
      <View style={styles.doctorImageContainer}>
        <Image source={{ uri: item.image }} style={styles.doctorImage} />
      </View>

      <View style={styles.doctorInfo}>
        <View style={styles.doctorHeader}>
          <View>
            <Label
              labelContent={item.name}
              family={FONTS.AxiformaBold}
              textStyle={styles.doctorName}
            />
            <Label
              labelContent={item.specialty}
              family={FONTS.AxiformaRegular}
              textStyle={styles.specialty}
            />
          </View>
          <TouchableOpacity style={styles.favoriteBtn}>
            <Ionicons name="heart-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.clinicInfo}>
          <Ionicons name="location-outline" size={14} color="#718096" />
          <Label
            labelContent={item.location}
            family={FONTS.AxiformaRegular}
            textStyle={styles.location}
          />
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Label
              labelContent={String(item.rating)}
              family={FONTS.AxiformaBold}
              textStyle={styles.ratingValue}
            />
            <Ionicons name="star" size={14} color="#FDD835" />
            <Label
              labelContent={`(${item.reviews})`}
              family={FONTS.AxiformaRegular}
              textStyle={styles.reviewCount}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEnabled
      >
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#A0AEC0" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctor..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {DOCTOR_SPECIALTIES.map(specialty => (
              <TouchableOpacity
                key={specialty}
                onPress={() => setSelectedSpecialty(specialty)}
                style={[
                  styles.filterChip,
                  selectedSpecialty === specialty && styles.filterChipActive,
                ]}
              >
                <Label
                  labelContent={specialty}
                  family={FONTS.AxiformaSemiBold}
                  textStyle={[
                    styles.filterText,
                    selectedSpecialty === specialty && styles.filterTextActive,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.resultsHeader}>
          <Label
            labelContent={`${doctors.length} found`}
            family={FONTS.AxiformaBold}
            textStyle={styles.resultsText}
          />
          <TouchableOpacity style={styles.sortBtn}>
            <Ionicons name="medical-outline" size={16} color={COLORS.primary} />
            <Label
              labelContent="Patient App"
              family={FONTS.AxiformaRegular}
              textStyle={styles.sortText}
            />
          </TouchableOpacity>
        </View>

        {doctors.length > 0 ? (
          <FlatList
            data={doctors}
            keyExtractor={item => item.id}
            renderItem={renderDoctorCard}
            scrollEnabled={false}
            style={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#CBD5E0" />
            <Label
              labelContent="No doctors found"
              family={FONTS.AxiformaBold}
              textStyle={styles.emptyText}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorConsultation;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    paddingLeft: 10,
    color: '#0F172A',
  },
  filterContainer: {
    marginTop: 16,
  },
  filterScroll: {
    flexGrow: 0,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    color: '#475569',
    fontSize: 12,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  resultsHeader: {
    marginTop: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsText: {
    fontSize: 16,
    color: COLORS.black,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    fontSize: 12,
    color: COLORS.primary,
  },
  listContainer: {
    marginBottom: 24,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
  },
  doctorImageContainer: {
    marginRight: 14,
  },
  doctorImage: {
    width: 78,
    height: 78,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorName: {
    fontSize: 15,
    color: COLORS.black,
  },
  specialty: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 4,
  },
  favoriteBtn: {
    padding: 4,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  location: {
    marginLeft: 6,
    fontSize: 12,
    color: '#64748B',
  },
  statsRow: {
    marginTop: 10,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 13,
    color: COLORS.black,
    marginRight: 4,
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 12,
    color: '#64748B',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 14,
    fontSize: 16,
    color: '#64748B',
  },
});
