import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';
import Loader from '../../../components/Loader/Loader';

const MOCK_REVIEWS = [
  {
    id: '1',
    author: 'Priya Sharma',
    rating: 5,
    date: '2 weeks ago',
    text: 'Very calm doctor and explained the treatment clearly.',
  },
  {
    id: '2',
    author: 'Rahul Verma',
    rating: 4,
    date: '1 month ago',
    text: 'Good consultation experience and helpful guidance.',
  },
];

const DoctorDetails = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const doctor = route?.params?.doctor;
  const [isFavorite, setIsFavorite] = useState(false);

  if (!doctor) {
    return (
      <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
        <Loader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={28} color={COLORS.black} />
          </TouchableOpacity>
          <Label
            labelContent="Doctor Details"
            family={FONTS.AxiformaBold}
            textStyle={styles.headerTitle}
          />
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            style={styles.favoriteBtn}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? '#FF6B6B' : COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.doctorCard}>
          <Image source={{ uri: doctor.image }} style={styles.doctorImage} />
          <Label
            labelContent={doctor.name}
            family={FONTS.AxiformaBold}
            textStyle={styles.doctorName}
          />
          <Label
            labelContent={doctor.specialty}
            family={FONTS.AxiformaSemiBold}
            textStyle={styles.specialty}
          />
          <View style={styles.clinicInfo}>
            <Ionicons name="location-outline" size={14} color="#718096" />
            <Label
              labelContent={doctor.hospital}
              family={FONTS.AxiformaRegular}
              textStyle={styles.clinic}
            />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Label
              labelContent={doctor.patients}
              family={FONTS.AxiformaBold}
              textStyle={styles.statValue}
            />
            <Label
              labelContent="patients"
              family={FONTS.AxiformaRegular}
              textStyle={styles.statLabel}
            />
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Label
              labelContent={doctor.experience}
              family={FONTS.AxiformaBold}
              textStyle={styles.statValue}
            />
            <Label
              labelContent="experience"
              family={FONTS.AxiformaRegular}
              textStyle={styles.statLabel}
            />
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={16} color="#FDD835" />
              <Label
                labelContent={String(doctor.rating)}
                family={FONTS.AxiformaBold}
                textStyle={styles.statValue}
              />
            </View>
            <Label
              labelContent={`(${doctor.reviews})`}
              family={FONTS.AxiformaRegular}
              textStyle={styles.statLabel}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Label
            labelContent="About"
            family={FONTS.AxiformaBold}
            textStyle={styles.sectionTitle}
          />
          <Label
            labelContent={doctor.about}
            family={FONTS.AxiformaRegular}
            textStyle={styles.aboutText}
          />
        </View>

        <View style={styles.section}>
          <Label
            labelContent="Working Time"
            family={FONTS.AxiformaBold}
            textStyle={styles.sectionTitle}
          />
          <View style={styles.workingHoursBox}>
            <Ionicons name="time-outline" size={16} color={COLORS.primary} />
            <Label
              labelContent={doctor.workingHours}
              family={FONTS.AxiformaRegular}
              textStyle={styles.workingHours}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.reviewsHeader}>
            <Label
              labelContent="Reviews"
              family={FONTS.AxiformaBold}
              textStyle={styles.sectionTitle}
            />
          </View>

          {MOCK_REVIEWS.map(review => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Label
                  labelContent={review.author}
                  family={FONTS.AxiformaBold}
                  textStyle={styles.reviewAuthor}
                />
                <Label
                  labelContent={review.date}
                  family={FONTS.AxiformaRegular}
                  textStyle={styles.reviewDate}
                />
              </View>
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={14}
                    color={i < review.rating ? '#FDD835' : '#E2E8F0'}
                  />
                ))}
              </View>
              <Label
                labelContent={review.text}
                family={FONTS.AxiformaRegular}
                textStyle={styles.reviewText}
              />
            </View>
          ))}
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={styles.callBtn}
            onPress={() => Linking.openURL('tel:+919999999999')}
          >
            <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            <Label
              labelContent="Call"
              family={FONTS.AxiformaSemiBold}
              textStyle={styles.actionBtnText}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chatBtn}
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'AIChat',
              })
            }
          >
            <Ionicons name="chatbubble-outline" size={20} color={COLORS.primary} />
            <Label
              labelContent="AI Chat"
              family={FONTS.AxiformaSemiBold}
              textStyle={styles.actionBtnText}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => navigation.navigate('BookAppointment', { doctor })}
        >
          <Label
            labelContent="Request Consultation"
            family={FONTS.AxiformaBold}
            textStyle={styles.bookBtnText}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDetails;

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    paddingHorizontal: 14,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 12,
  },
  backBtn: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    color: COLORS.black,
    flex: 1,
    textAlign: 'center',
  },
  favoriteBtn: {
    padding: 8,
  },
  doctorCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },
  doctorImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E2E8F0',
  },
  doctorName: {
    marginTop: 12,
    fontSize: 20,
    color: COLORS.black,
  },
  specialty: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.primary,
  },
  clinicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  clinic: {
    marginLeft: 6,
    color: '#64748B',
    fontSize: 12,
  },
  statsContainer: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 16,
    color: COLORS.black,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#64748B',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  section: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
  },
  aboutText: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 21,
    color: '#475569',
  },
  workingHoursBox: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  workingHours: {
    marginLeft: 8,
    color: '#475569',
    fontSize: 13,
  },
  reviewsHeader: {
    marginBottom: 10,
  },
  reviewItem: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewAuthor: {
    fontSize: 13,
    color: COLORS.black,
  },
  reviewDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  ratingContainer: {
    marginTop: 8,
    flexDirection: 'row',
  },
  reviewText: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#475569',
  },
  actionButtonsContainer: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 12,
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chatBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionBtnText: {
    marginLeft: 8,
    color: COLORS.primary,
  },
  bookBtn: {
    marginTop: 16,
    marginBottom: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});
