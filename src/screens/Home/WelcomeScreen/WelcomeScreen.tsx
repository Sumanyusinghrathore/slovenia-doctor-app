import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from '../../../constants';
import { useApp, navigationStateType } from '../../../context/AppContext';

const DUMMY_IMAGE = require('../../../assets/images/Jansevacare.png');

type SlideType = {
  key: string;
  title: string;
  text: string;
  backgroundColor: string;
  image: any;
};

const slides: SlideType[] = [
  {
    key: 'one',
    title: 'Welcome to JansevaCare',
    text: 'Book doctor appointments easily and take control of your health anytime, anywhere.',
    backgroundColor: COLORS.white || '#ffffff',
    image: DUMMY_IMAGE,
  },
  {
    key: 'two',
    title: 'Find the Right Doctor',
    text: 'Search doctors by specialty, location, and availability that fits your schedule.',
    backgroundColor: COLORS.lightGray || '#f5f5f5',
    image: DUMMY_IMAGE,
  },
  {
    key: 'three',
    title: 'Easy Appointments & Care',
    text: 'Book appointments, manage medical records, and get reminders all in one place.',
    backgroundColor: COLORS.lightGray || '#f5f5f5',
    image: DUMMY_IMAGE,
  },
];

const WelcomeScreen: React.FC = () => {
  const { setNavigationState, userData } = useApp();
  const sliderRef = useRef<AppIntroSlider>(null);
  const isLastSlideRef = useRef(false);

  const handleFinish = useCallback(async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');

    if (userData) {
      setNavigationState(navigationStateType.HOME);
    } else {
      setNavigationState(navigationStateType.AUTH);
    }
  }, [setNavigationState, userData]);

  const renderItem = ({ item }: { item: SlideType }) => (
    <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderItem}
        showNextButton={false}
        showPrevButton={false}
        showDoneButton={false}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onSlideChange={(index) => {
          isLastSlideRef.current = index === slides.length - 1;
        }}
      />

      {/* 🔥 CUSTOM BOTTOM BUTTON */}
      <View style={styles.bottomButtonWrapper}>
        <Text
          onPress={() => {
            if (isLastSlideRef.current) {
              handleFinish();
            } else {
              sliderRef.current?.goToSlide(
                sliderRef.current?.state.activeIndex + 1,
                true
              );
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {isLastSlideRef.current ? 'Get Started' : 'Next'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.black || '#000',
    marginBottom: 12,
    fontFamily: FONTS.AxiformaBold,
  },

  text: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 16,
    lineHeight: 22,
    color: COLORS.gray || '#555',
    fontFamily: FONTS.AxiformaRegular,
  },

  bottomButtonWrapper: {
    position: 'absolute',
    bottom: 60, // ✅ navigation bar se upar
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  button: {
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 24,
    backgroundColor: COLORS.primary || '#4a90e2',
  },

  buttonText: {
    color: COLORS.white || '#fff',
    fontSize: 14,
    fontFamily: FONTS.AxiformaBold,
  },

  dot: {
    backgroundColor: '#ccc',
  },

  activeDot: {
    backgroundColor: COLORS.primary || '#4a90e2',
    width: 32,
  },
});
