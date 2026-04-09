import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Pressable,
} from 'react-native';
import { COLORS, FONTS, genericStyles } from '../../../constants';
import Slider from '../../../components/Slider/Slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import Label from '../../../components/Label/Labels';
import { useNavigation } from '@react-navigation/native';
import DashboardHeader from '../../../components/DashboardHeader/DashboardHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useApp } from '../../../context/AppContext';

/* ---------------- SAFE DEFAULT IMAGE ---------------- */
const DEFAULT_IMAGE =
  'https://via.placeholder.com/400x250.png?text=Janseva+Care';

const Dashboard = () => {
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const { userData } = useApp();

  /* ---- BANNER SLIDER DATA ---- */
  const bannerDetails = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQzl7Dc_uWTC7KtTrU-zbX9A0_rsJ6G_EUIw&s',
    'https://marketplace.canva.com/EAGAPb6bH7I/2/0/1600w/canva-purple-and-white-line-modern-medical-care-banner-landscape-Wc2zRJZIjlM.jpg',
  ];

  /* ---- CATEGORIES DATA ---- */
  const categories = [
    { id: '1', name: 'Dentistry', icon: 'tooth', color: '#E8A5A5' },
    { id: '2', name: 'Cardiology', icon: 'heart-pulse', color: '#A5D8A0' },
    { id: '3', name: 'Pulmonology', icon: 'lungs', color: '#F5B86B' },
    { id: '4', name: 'General', icon: 'stethoscope', color: '#D4B5E0' },
    { id: '5', name: 'Neurology', icon: 'brain', color: '#6FB5B5' },
    { id: '6', name: 'Gastroenterology', icon: 'stomach', color: '#5A3D7D' },
    { id: '7', name: 'Laboratory', icon: 'flask-outline', color: '#E0B8A0' },
    { id: '8', name: 'Vaccination', icon: 'needle', color: '#7ECCC7' },
  ];

  /* ---- MEDICAL CENTERS DATA ---- */
  const medicalCenters = [
    {
      id: '1',
      name: 'Sunrise Health Clinic',
      image: 'data:image/png;base64,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',
    },
    {
      id: '2',
      name: 'Golden Cardiology Center',
      image: 'data:image/jpeg;base64,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',
    },
  ];

  /* ---------------- REFRESH ---------------- */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  /* ---- UI ---- */
  return (
    <SafeAreaView style={[genericStyles.container, styles.safeArea]}>
      <DashboardHeader name={userData?.name} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Banner Slider */}
        <View style={styles.sliderSection}>
          <Slider images={bannerDetails} height={200} />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Label
              size={20}
              family={FONTS.AxiformaBold}
              color={COLORS.black}
              labelContent="Medical Services"
            />
          </View>

          <FlatList
            data={categories}
            numColumns={4}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.categoryRow}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.categoryCard, { backgroundColor: item.color }]}
                onPress={() => { }}
              >
                <Icon name={item.icon} size={32} color="white" />
                <Label
                  size={10}
                  family={FONTS.AxiformaMedium}
                  color={COLORS.white}
                  labelContent={item.name}
                  align="center"
                />
              </Pressable>
            )}
          />
        </View>

        {/* Medical Centers */}
        <View style={styles.medicalCentersSection}>
          <View style={styles.sectionHeader}>
            <Label
              size={20}
              family={FONTS.AxiformaBold}
              color={COLORS.black}
              labelContent="Nearby Medical Centers"
            />
            {/* <AppButton
              title="See All"
              containerStyle={styles.seeAllBtn}
              titleStyle={styles.seeAllText}
              onPress={() => { }}
            /> */}
          </View>

          <FlatList
            data={medicalCenters}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={styles.centerCard}
                onPress={() => { }}
              >
                <ImageBackground
                  source={{ uri: item.image }}
                  style={styles.centerImage}
                  imageStyle={{ borderRadius: 12 }}
                >
                  <View style={styles.centerOverlay} />
                </ImageBackground>
                <View style={{ marginTop: 10 }}>
                  <Label
                    size={14}
                    family={FONTS.AxiformaBold}
                    color={COLORS.black}
                    labelContent={item.name}
                  />
                </View>
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

/* ---- STYLES ---- */

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContent: {
    paddingBottom: 80,
  },

  /* Slider Section */
  sliderSection: {
    paddingVertical: 0,
  },

  /* Section */
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  medicalCentersSection: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllBtn: {
    backgroundColor: COLORS.primary,
    height: 36,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  seeAllText: {
    fontSize: 12,
    color: COLORS.white,
    paddingHorizontal: 0,
  },

  /* Categories */
  categoryRow: {
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
  },

  /* Medical Centers */
  centerCard: {
    marginRight: 15,
    width: 220,
  },
  centerImage: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  centerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
