import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS, genericStyles } from '../../../constants';
import Label from '../../../components/Label/Labels';

/* SERVICE DATA MAPPING */
const SERVICES_DATA: any = {
  'diagnostic-tests': {
    title: 'Diagnostic Tests',
    icon: 'flask-outline',
    color: '#66BB6A',
    description: 'Professional diagnostic testing services',
    tests: [
      {
        id: '1',
        name: 'Blood Test',
        description: 'Complete blood count, lipid profile, glucose',
        price: '₹500',
        duration: '30 mins',
        icon: 'water-outline',
      },
      {
        id: '2',
        name: 'Sugar Test',
        description: 'Fasting & post-meal glucose testing',
        price: '₹300',
        duration: '15 mins',
        icon: 'flask-outline',
      },
      {
        id: '3',
        name: 'COVID-19 Test',
        description: 'RT-PCR & Antigen rapid test',
        price: '₹400',
        duration: '20 mins',
        icon: 'shield-checkmark-outline',
      },
      {
        id: '4',
        name: 'Thyroid Profile',
        description: 'TSH, T3, T4 level testing',
        price: '₹600',
        duration: '25 mins',
        icon: 'flask-outline',
      },
      {
        id: '5',
        name: 'Liver Function Test',
        description: 'Complete liver health assessment',
        price: '₹550',
        duration: '25 mins',
        icon: 'flask-outline',
      },
      {
        id: '6',
        name: 'Kidney Function Test',
        description: 'Creatinine, BUN, and kidney parameters',
        price: '₹450',
        duration: '20 mins',
        icon: 'flask-outline',
      },
    ],
  },
  'blood-donation': {
    title: 'Blood Donation Camp',
    icon: 'water-outline',
    color: '#EC407A',
    description: 'Save lives by donating blood',
    tests: [
      {
        id: '1',
        name: 'Blood Donation',
        description: 'Donate 450ml whole blood',
        price: 'Free',
        duration: '30 mins',
        icon: 'water-outline',
      },
      {
        id: '2',
        name: 'Platelet Donation',
        description: 'Donate platelets only',
        price: 'Free',
        duration: '60 mins',
        icon: 'water-outline',
      },
      {
        id: '3',
        name: 'Plasma Donation',
        description: 'Donate plasma for patients',
        price: 'Free',
        duration: '45 mins',
        icon: 'water-outline',
      },
    ],
  },
  'general-checkup': {
    title: 'General Health Checkup',
    icon: 'medkit-outline',
    color: '#FF6B6B',
    description: 'Comprehensive health screening',
    tests: [
      {
        id: '1',
        name: 'Basic Checkup',
        description: 'BP, temperature, weight, height',
        price: '₹200',
        duration: '15 mins',
        icon: 'medkit-outline',
      },
      {
        id: '2',
        name: 'Health Screening Package',
        description: 'Full body screening with reports',
        price: '₹2000',
        duration: '90 mins',
        icon: 'medkit-outline',
      },
      {
        id: '3',
        name: 'ECG Test',
        description: 'Heart electrical activity check',
        price: '₹800',
        duration: '20 mins',
        icon: 'heart-outline',
      },
      {
        id: '4',
        name: 'Ultrasound Scan',
        description: 'Abdominal or targeted ultrasound',
        price: '₹1200',
        duration: '30 mins',
        icon: 'medkit-outline',
      },
    ],
  },
  'emergency': {
    title: 'Emergency Services',
    icon: 'alert-circle-outline',
    color: '#FB8C00',
    description: '24/7 emergency medical assistance',
    tests: [
      {
        id: '1',
        name: 'Emergency Ambulance',
        description: 'Quick ambulance dispatch',
        price: '₹500',
        duration: 'Immediate',
        icon: 'alert-circle-outline',
      },
      {
        id: '2',
        name: 'First Aid Support',
        description: 'On-site first aid assistance',
        price: '₹300',
        duration: '15 mins',
        icon: 'medkit-outline',
      },
      {
        id: '3',
        name: 'Tele-Emergency',
        description: 'Talk to emergency specialist',
        price: '₹1000',
        duration: '10 mins',
        icon: 'call-outline',
      },
    ],
  },
  'vaccination': {
    title: 'Vaccination Services',
    icon: 'bandage-outline',
    color: '#AB47BC',
    description: 'Immunization and vaccination programs',
    tests: [
      {
        id: '1',
        name: 'COVID-19 Vaccine',
        description: 'Pfizer, Moderna, Covaxin doses',
        price: 'Free',
        duration: '30 mins',
        icon: 'bandage-outline',
      },
      {
        id: '2',
        name: 'Influenza Vaccine',
        description: 'Annual flu shot',
        price: '₹400',
        duration: '15 mins',
        icon: 'bandage-outline',
      },
      {
        id: '3',
        name: 'Polio Vaccine',
        description: 'Oral polio vaccine (OPV)',
        price: '₹100',
        duration: '10 mins',
        icon: 'bandage-outline',
      },
      {
        id: '4',
        name: 'Typhoid Vaccine',
        description: 'Protection against typhoid',
        price: '₹800',
        duration: '20 mins',
        icon: 'bandage-outline',
      },
    ],
  },
  'mental-health': {
    title: 'Mental Health Care',
    icon: 'heart-outline',
    color: '#FDD835',
    description: 'Counseling and mental health support',
    tests: [
      {
        id: '1',
        name: 'Counseling Session',
        description: '1-on-1 counseling with expert',
        price: '₹500',
        duration: '45 mins',
        icon: 'heart-outline',
      },
      {
        id: '2',
        name: 'Therapy Session',
        description: 'Behavioral therapy and support',
        price: '₹800',
        duration: '60 mins',
        icon: 'heart-outline',
      },
      {
        id: '3',
        name: 'Stress Management',
        description: 'Meditation and stress relief',
        price: '₹400',
        duration: '30 mins',
        icon: 'heart-outline',
      },
    ],
  },
};

const HealthcareDetails = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const categoryId = route?.params?.categoryId || 'diagnostic-tests';
  const serviceData = SERVICES_DATA[categoryId];
  const [selectedTest, setSelectedTest] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);

  if (!serviceData) {
    return (
      <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
        <View style={styles.emptyContainer}>
          <Label
            labelContent="Service not found"
            family={FONTS.AxiformaBold}
            textStyle={styles.emptyText}
          />
        </View>
      </SafeAreaView>
    );
  }

  const addToCart = (test: any) => {
    setCart([...cart, test]);
  };

  const renderTestCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setSelectedTest(item)}
      style={styles.testCard}
    >
      <View
        style={[
          styles.testIconBg,
          { backgroundColor: serviceData.color + '20' },
        ]}
      >
        <Ionicons name={item.icon} size={32} color={serviceData.color} />
      </View>

      <View style={styles.testInfo}>
        <Label
          labelContent={item.name}
          family={FONTS.AxiformaBold}
          textStyle={styles.testName}
        />
        <Label
          labelContent={item.description}
          family={FONTS.AxiformaRegular}
          textStyle={styles.testDescription}
        />

        <View style={styles.testMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#718096" />
            <Label
              labelContent={item.duration}
              family={FONTS.AxiformaRegular}
              textStyle={styles.metaText}
            />
          </View>
          <Label
            labelContent={item.price}
            family={FONTS.AxiformaBold}
            textStyle={[styles.price, { color: serviceData.color }]}
          />
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#CBD5E0"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[genericStyles.container, styles.safeContainer]}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={28} color={COLORS.black} />
          </TouchableOpacity>
          <Label
            labelContent={serviceData.title}
            family={FONTS.AxiformaBold}
            textStyle={styles.headerTitle}
          />
          <View style={{ width: 44 }} />
        </View>

        {/* Service Hero */}
        <View
          style={[
            styles.heroSection,
            { backgroundColor: serviceData.color + '15' },
          ]}
        >
          <View
            style={[
              styles.heroIcon,
              { backgroundColor: serviceData.color + '30' },
            ]}
          >
            <Ionicons
              name={serviceData.icon}
              size={48}
              color={serviceData.color}
            />
          </View>
          <Label
            labelContent={serviceData.description}
            family={FONTS.AxiformaRegular}
            textStyle={styles.heroText}
          />
        </View>

        {/* Tests List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Label
              labelContent="Available Services"
              family={FONTS.AxiformaBold}
              textStyle={styles.sectionTitle}
            />
            <Label
              labelContent={`${serviceData.tests.length} services`}
              family={FONTS.AxiformaRegular}
              textStyle={styles.serviceCount}
            />
          </View>

          <FlatList
            data={serviceData.tests}
            keyExtractor={item => item.id}
            renderItem={renderTestCard}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <View style={styles.cartSection}>
            <View style={styles.cartHeader}>
              <Label
                labelContent={`${cart.length} items in cart`}
                family={FONTS.AxiformaBold}
                textStyle={styles.cartTitle}
              />
              <TouchableOpacity
                onPress={() => setCart([])}
                style={styles.clearBtn}
              >
                <Label
                  labelContent="Clear"
                  family={FONTS.AxiformaSemiBold}
                  textStyle={styles.clearText}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.proceedBtn}>
              <Label
                labelContent="Proceed to Booking"
                family={FONTS.AxiformaBold}
                textStyle={styles.proceedBtnText}
              />
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Test Detail Modal */}
        {selectedTest && (
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Label
                  labelContent={selectedTest.name}
                  family={FONTS.AxiformaBold}
                  textStyle={styles.modalTitle}
                />
                <TouchableOpacity onPress={() => setSelectedTest(null)}>
                  <Ionicons
                    name="close-outline"
                    size={24}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <View
                  style={[
                    styles.modalIconBg,
                    { backgroundColor: serviceData.color + '20' },
                  ]}
                >
                  <Ionicons
                    name={selectedTest.icon}
                    size={48}
                    color={serviceData.color}
                  />
                </View>

                <Label
                  labelContent={selectedTest.description}
                  family={FONTS.AxiformaRegular}
                  textStyle={styles.modalDescription}
                />

                <View style={styles.modalDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={18} color={COLORS.primary} />
                    <View style={styles.detailContent}>
                      <Label
                        labelContent="Duration"
                        family={FONTS.AxiformaRegular}
                        textStyle={styles.detailLabel}
                      />
                      <Label
                        labelContent={selectedTest.duration}
                        family={FONTS.AxiformaBold}
                        textStyle={styles.detailValue}
                      />
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="pricetag-outline" size={18} color={COLORS.primary} />
                    <View style={styles.detailContent}>
                      <Label
                        labelContent="Price"
                        family={FONTS.AxiformaRegular}
                        textStyle={styles.detailLabel}
                      />
                      <Label
                        labelContent={selectedTest.price}
                        family={FONTS.AxiformaBold}
                        textStyle={styles.detailValue}
                      />
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.addCartBtn}
                onPress={() => {
                  addToCart(selectedTest);
                  setSelectedTest(null);
                }}
              >
                <Label
                  labelContent="Add to Cart"
                  family={FONTS.AxiformaBold}
                  textStyle={styles.addCartBtnText}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthcareDetails;

/* -------- STYLES -------- */

const styles = StyleSheet.create({
  safeContainer: {
    backgroundColor: '#F8FAFB',
  },

  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    paddingHorizontal: 14,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    color: '#A0AEC0',
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

  heroSection: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  heroText: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 20,
  },

  section: {
    marginBottom: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    color: COLORS.black,
  },

  serviceCount: {
    fontSize: 12,
    color: '#A0AEC0',
  },

  testCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.05,
    elevation: 2,
  },

  testIconBg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  testInfo: {
    flex: 1,
  },

  testName: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 3,
  },

  testDescription: {
    fontSize: 11,
    color: '#718096',
    marginBottom: 8,
  },

  testMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  metaText: {
    fontSize: 11,
    color: '#718096',
  },

  price: {
    fontSize: 14,
  },

  chevron: {
    marginLeft: 8,
  },

  separator: {
    height: 4,
    backgroundColor: 'transparent',
  },

  cartSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    marginHorizontal: -14,
    marginBottom: -14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    shadowOpacity: 0.08,
    elevation: 5,
  },

  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  cartTitle: {
    fontSize: 14,
    color: COLORS.black,
  },

  clearBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  clearText: {
    fontSize: 12,
    color: '#FF6B6B',
  },

  proceedBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  proceedBtnText: {
    fontSize: 14,
    color: '#FFFFFF',
  },

  modal: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    color: COLORS.black,
    flex: 1,
  },

  modalBody: {
    alignItems: 'center',
    marginBottom: 20,
  },

  modalIconBg: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalDescription: {
    fontSize: 13,
    color: '#4A5568',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },

  modalDetails: {
    width: '100%',
    gap: 12,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFB',
    padding: 12,
    borderRadius: 10,
  },

  detailContent: {
    marginLeft: 12,
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    color: '#A0AEC0',
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 14,
    color: COLORS.black,
  },

  addCartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },

  addCartBtnText: {
    fontSize: 14,
    color: '#FFFFFF',
  },
});
