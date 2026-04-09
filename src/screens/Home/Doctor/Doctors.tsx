import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Label from '../../../components/Label/Labels';
import { FONTS, genericStyles, COLORS } from '../../../constants';
import { PATIENT_DOCTORS } from '../../../config/patientDoctors';

const Doctors = ({ navigation }: any) => {
  const renderDoctor = ({ item }: { item: typeof PATIENT_DOCTORS[number] }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.image }} style={styles.avatar} />

        <View style={styles.infoBlock}>
          <Label
            labelContent={item.name}
            family={FONTS.AxiformaBold}
            textStyle={styles.name}
          />
          <Label
            labelContent={item.specialty}
            family={FONTS.AxiformaRegular}
            textStyle={styles.specialization}
          />
          <Label
            labelContent={item.hospital}
            family={FONTS.AxiformaRegular}
            textStyle={styles.hospital}
          />

          <View style={styles.metaRow}>
            <View style={styles.rating}>
              <Ionicons name="star" size={14} color="#FFC107" />
              <Label
                labelContent={item.rating.toString()}
                textStyle={styles.ratingText}
              />
            </View>

            <Label
              labelContent={item.experience}
              textStyle={styles.experience}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.bookBtn}
        onPress={() => navigation.navigate('DoctorDetails', { doctor: item })}
      >
        <Ionicons name="medical-outline" size={18} color="#FFF" />
        <Label
          labelContent="Request Consultation"
          family={FONTS.AxiformaSemiBold}
          textStyle={styles.bookText}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      <FlatList
        data={PATIENT_DOCTORS}
        keyExtractor={item => item.id}
        renderItem={renderDoctor}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Doctors;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F9FC',
  },
  list: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBlock: {
    flex: 1,
    marginLeft: 12,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EAF4FF',
  },
  name: {
    fontSize: 16,
    color: COLORS.black,
  },
  specialization: {
    fontSize: 13,
    color: COLORS.primary,
    marginTop: 2,
  },
  hospital: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    justifyContent: 'space-between',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: COLORS.black,
  },
  experience: {
    fontSize: 11,
    color: '#6B7280',
  },
  bookBtn: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 6,
  },
});
