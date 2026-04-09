import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Image, FlatList, Alert, Linking, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useQueries } from 'react-query';
import { useForm } from 'react-hook-form';

import CustomHeader from '../../../components/Header/CustomHeader';
import Label from '../../../components/Label/Labels';
import GradientButton from '../../../components/CustomButton/GradientButton';
import { COLORS, genericStyles } from '../../../constants';
import { fetchData, endpointWithId, endpoints, getData } from '../../../helper/function';
import UseDropDown from '../../../components/Hook/UseDropDown';
import UseInput from '../../../components/Hook/UseInput';
import DatePicker from '../../../components/DatePicker/DatePicker';
import TouchableComponent from '../../../components/Routine/TouchableComponent';
import {
  initiatePayment,
  verifyCashfreePayment,
  createAdventureBooking,
} from '../../../helper/function';
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TrendingDetailsRouteParams = {
  TrendingDetails: {
    camp: any;
  };
};

interface AdventureItem {
  _id: string;
  text: string;
  status: boolean;
}

type BookingFormValues = {
  fullName: string;
  email: string;
  phone: string;
  persons: string;
  package: {
    id: number;
    name: string;
    price: string;
  } | null;
  dateTime: string;
  dateTimeText: string;
};

interface PriceItem {
  type: string;
  price: string;
}

interface AdventureDetails {
  _id: string;
  name: string;
  location: string;
  description: string;
  image_paths: string[];
  price: PriceItem[];
  Highlights: AdventureItem[];
  Includes: AdventureItem[];
  Tags?: string[];
}

interface StoredUser {
  token: string;
}

/* ================= SCREEN ================= */

const TrendingDetails = () => {
  const route = useRoute<RouteProp<TrendingDetailsRouteParams, 'TrendingDetails'>>();
  const { camp } = route.params;
  const pendingBookingRef = useRef<any>(null);
  const pendingTokenRef = useRef<string | null>(null);
  const pendingPaymentRef = useRef<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  /* ---------- API ---------- */
  const results = useQueries([
    {
      queryKey: ['adventure-details', camp.slug],
      queryFn: () =>
        fetchData(
          endpointWithId(camp.slug).GET_ADVENTURE_DETAILS,
          '',
          '',
          'get',
          true,
        ),
    },
  ]);

  const adventure = results[0]?.data?.data as AdventureDetails | undefined;
  console.log(adventure)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      persons: '1',
      package: null,
      dateTime: '',
      dateTimeText: '',
    },
  });

  const selectedPackage = watch('package');
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);


  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  /* ---------- PACKAGE OPTIONS ---------- */
  const packageOptions =
    adventure?.price?.map((item, index) => ({
      id: index + 1,
      name: `${item.type} - ₹${item.price}`,
      price: item.price,
    })) ?? [];

  /* ---------- CASHFREE SDK SETUP ---------- */
  useEffect(() => {
    // Initialize Cashfree SDK
    const initializeCashfree = () => {
      try {
        console.log('🔵 Initializing Cashfree SDK...');

        // Set callback for payment response
        CFPaymentGatewayService.setCallback({
          onVerify: async (orderId: string) => {
            console.log('✅ CASHFREE PAYMENT SUCCESS:', orderId);

            const cfOrderId = pendingPaymentRef.current?.cfOrderId;
            if (!cfOrderId) return;

            try {
              const res = await verifyCashfreePayment(
                cfOrderId,
                pendingTokenRef.current
              );

              const responseData = res.data as any;
              if (responseData?.order_status === 'PAID') {
                await createAdventureBooking(
                  {
                    ...pendingBookingRef.current,
                    cf_order_id: cfOrderId,
                    order_status: 'PAID',
                  },
                  pendingTokenRef.current
                );

                Alert.alert('Success 🎉', 'Booking Confirmed!');

                // Clear pending data
                pendingBookingRef.current = null;
                pendingTokenRef.current = null;
                pendingPaymentRef.current = null;
              } else {
                Alert.alert('Payment Pending', 'Payment verification pending.');
              }
            } catch (e) {
              console.log('Verification error:', e);
              Alert.alert('Error', 'Payment verification failed');
            }
          },

          onError: (error: any, orderId: string) => {
            console.log('❌ CASHFREE PAYMENT ERROR:', { error, orderId });
            Alert.alert('Payment Failed', error?.message || 'Payment process failed');
          },
        });

        console.log('✅ Cashfree SDK initialized');

      } catch (e) {
        console.log('❌ Cashfree SDK init error:', e);
      }
    };

    initializeCashfree();

    return () => {
      CFPaymentGatewayService.removeCallback();
    };
  }, []);

  /* ---------- START CASHFREE PAYMENT ---------- */
  const startCashfreePayment = (responseData: {
    payment_session_id: string;
    order_id: string;
  }) => {
    try {
      console.log('🚀 Opening Cashfree Native SDK');
      const cleanSessionId = responseData.payment_session_id.split('payment')[0];
      const paymentParams = {
        orderId: responseData.order_id,
        paymentSessionId: cleanSessionId,
        environment: 'SANDBOX', // LIVE => 'PRODUCTION'
        version: '1.0.0',
      };

      // ✅ THIS OPENS SDK
      CFPaymentGatewayService.doPayment(paymentParams);

    } catch (e: any) {
      console.log('❌ Cashfree SDK Error:', e);
      Alert.alert('Payment Error', e.message || 'SDK open failed');
    }
  };


  /* ---------- SUBMIT ---------- */
  const onSubmit = async (data: BookingFormValues) => {
    try {
      if (!user?.token || !data.package || !data.dateTime || !adventure) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      const dateOnly = data.dateTime.split('T')[0];

      // 🔥 IMPORTANT: Convert rupees to paise for Cashfree
      const priceInRupees = parseFloat(data.package.price);
      const personsCount = parseInt(data.persons) || 1;

      if (isNaN(priceInRupees) || priceInRupees <= 0) {
        Alert.alert('Error', 'Invalid package price');
        return;
      }

      // Cashfree expects amount in paise (₹1 = 100 paise)
      const amountInPaise = Math.round(priceInRupees * personsCount);

      console.log('--- PAYMENT DETAILS ---');
      console.log('Package Price (₹):', priceInRupees);
      console.log('Persons:', personsCount);
      console.log('Amount (₹):', priceInRupees * personsCount);
      console.log('Amount (paise for Cashfree):', amountInPaise);

      // Validate amount (minimum ₹1 = 100 paise)
      if (amountInPaise < 100) {
        Alert.alert('Error', 'Minimum amount should be ₹1');
        return;
      }

      // ✅ SAVE booking payload FOR CALLBACK
      const bookingPayload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        members: personsCount,
        adventurePackageId: adventure._id,
        adventurePackageName: adventure.name,
        selectedDate: data.dateTime,
        packagePrice: data.package.price,
        location: adventure.location,
      };

      pendingBookingRef.current = bookingPayload;
      pendingTokenRef.current = user.token;

      // ✅ PAYMENT PAYLOAD
      const paymentPayload = {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        amount: amountInPaise,      // paise
        payment_mode: "SDK",        // 🔥 MUST
        adventure_package_id: adventure._id,
        price_type: data.package.name.split('-')[0].trim(),
        date_time: dateOnly,
        adventurePackageName: adventure.name,
        sessionDetails: JSON.stringify({ date: dateOnly }),
      };


      console.log("✅ Payment Payload:", JSON.stringify(paymentPayload, null, 2));

      const response = await initiatePayment(paymentPayload, user.token);
      console.log("✅ Full API Response:", JSON.stringify(response, null, 2));

      // Check if response has the required data
      if (!response || !response.payment_session_id || !response.order_id) {
        console.log('❌ Invalid response structure:', response);
        Alert.alert('Error', 'Invalid payment response from server');
        return;
      }

      const responseData = {
        payment_session_id: response.payment_session_id,
        order_id: response.order_id,
      };

      console.log("✅ Extracted Response Data:", responseData);

      pendingPaymentRef.current = {
        cfOrderId: response.order_id,
        internalOrderId: response.internal_order_id || response.order_id,
      };

      console.log("✅ Pending Payment Ref:", pendingPaymentRef.current);

      // Start Cashfree payment
      startCashfreePayment(responseData);

    } catch (err: any) {
      console.log('❌ PAYMENT INIT FAILED:', err);

      if (err?.response?.data) {
        console.log('BACKEND ERROR:', JSON.stringify(err.response.data, null, 2));
        Alert.alert('Payment Error', err.response.data.error || 'Payment failed');
      } else {
        Alert.alert('Error', err.message || 'Payment failed');
      }
    }
  };

  const openWebBooking = () => {
  if (!camp?.slug) {
    Alert.alert('Error', 'Invalid adventure');
    return;
  }

  const url = `https://bookmyadventure.co.in/trending/${camp.slug}`;
  Linking.openURL(url).catch(() =>
    Alert.alert('Error', 'Unable to open link')
  );
};

  if (!adventure) return null;
  const safeText = (val: any) =>
    typeof val === 'string' ? val : val?.text ?? '';

  return (
    <SafeAreaView style={genericStyles.container}>
      <CustomHeader title={adventure.name} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- IMAGES ---------- */}
        {adventure.image_paths.length > 1 ? (
          // 🔹 MULTIPLE IMAGES → SLIDER
          <FlatList
            horizontal
            pagingEnabled
            data={adventure.image_paths}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.sliderImage}
              />
            )}
          />
        ) : (
          // 🔹 SINGLE IMAGE → FULL WIDTH
          <View style={styles.singleImageWrapper}>
            <Image
              source={{ uri: adventure.image_paths[0] }}
              style={styles.singleImage}
            />
          </View>
        )}


        <View style={styles.content}>
          <Label size={22} labelContent={adventure.name} />
          <Label
            size={14}
            color={COLORS.gray}
            labelContent={adventure.location}
          />

          <View style={styles.priceCard}>
            <Label size={14} color="#fff" labelContent="Starting From" />
            <Label
              size={22}
              color="#fff"
              labelContent={`₹ ${adventure.price?.[0]?.price}`}
            />
          </View>

          <View style={styles.aboutCard}>
  <Label
    size={18}
    labelContent="About this Adventure"
    textStyle={styles.sectionTitle}
  />

  <Label
    size={14}
    color={COLORS.newGray}
    align="justify"
    labelContent={safeText(adventure.description)}
    textStyle={styles.aboutText}
  />

  {adventure.Tags && adventure.Tags.length > 0 && (
    <View style={styles.tagsWrapper}>
      {adventure.Tags.map((tag, index) => (
        <View key={index} style={styles.tagChip}>
          <Label
            size={12}
            color={COLORS.primary}
            labelContent={safeText(tag)}
          />
        </View>
      ))}
    </View>
  )}
</View>


          <View style={styles.section}>
            <Label size={16} labelContent="Highlights" />
            <View style={styles.chipsContainer}>
              {adventure.Highlights?.map(item => (
                <View key={item._id} style={styles.chip}>
                  <Label size={12} labelContent={safeText(item)} />
                </View>
              ))}


            </View>
          </View>

          <View style={styles.section}>
            <Label size={16} labelContent="Includes" />
            {adventure.Includes?.map(item => (
              <Label
                key={item._id}
                size={14}
                labelContent={`• ${safeText(item)}`}
              />
            ))}


          </View>
        </View>

        <View style={styles.bookingCard}>
          {/* <Label
            size={25}
            color={COLORS.white}
            labelContent="Book Your Adventure"
            mv={10}
          />
          <UseInput
            name="fullName"
            control={control}
            placeholder="Full Name"
            topLabel="Full Name"
            required
          />
          <UseInput
            name="email"
            control={control}
            placeholder="Email"
            keyboardType="email-address"
            topLabel="Email"
            required
          />
          <UseInput
            name="phone"
            control={control}
            placeholder="Phone"
            keyboardType="number-pad"
            topLabel="Phone"
            required
          />
          <UseDropDown
            name="package"
            control={control}
            data={packageOptions}
            placeholder="Select Package"
            placeholderStyle={{ color: COLORS.black }}
            labelField="name"
            valueField="id"
            topLabel="Select Package"
          />

          <UseInput
            name="persons"
            control={control}
            placeholder="Number of Persons"
            keyboardType="number-pad"
            topLabel="Persons"
            required
          />
          <TouchableComponent
            style={styles.inputWrapper}
            onPress={() => setShowFromPicker(true)}
          >
            <UseInput
              topLabel="Transaction Date"
              name="dateTimeText"
              control={control}
              required
              placeholder="Select Date"
              editable={false}
              inputContainerStyle={{ backgroundColor: COLORS.primary2 }}
            />
          </TouchableComponent>
          <DatePicker
            mode="datetime"
            onShow={showFromPicker}
            onConfirm={date => {
              setShowFromPicker(false);
              const isoDate = date.toISOString();
              setValue('dateTime', isoDate, {
                shouldValidate: true,
                shouldDirty: true,
              });
              setValue('dateTimeText', formatDateTime(date), {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
            onCancel={() => setShowFromPicker(false)}
          /> */}
          <GradientButton
            title="Confirm Booking"
            loading={isSubmitting}
            onPress={openWebBooking}
            disabled={isSubmitting}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrendingDetails;
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  image: {
    width: 320,
    height: 220,
    borderRadius: 14,
    marginHorizontal: 10,
    marginTop: 10,
  },
  content: {
    padding: 16,
  },
  priceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    padding: 14,
    marginTop: 14,
  },
  section: {
    marginTop: 20,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  bookingCard: {
    backgroundColor: COLORS.gradientprimary,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  sliderImage: {
    width: width - 40,
    height: 220,
    borderRadius: 14,
    marginHorizontal: 20,
    marginTop: 10,
  },

  singleImageWrapper: {
    paddingHorizontal: 20,   // 👈 left-right gap
    paddingTop: 10,          // 👈 top gap
    paddingBottom: 10,       // 👈 bottom gap
  },

  singleImage: {
    width: width - 40,
    height: 260,
    borderRadius: 16,
    resizeMode: 'cover',
  },
aboutCard: {
  backgroundColor: COLORS.white,
  borderRadius: 16,
  padding: 16,
  marginTop: 20,

  // subtle shadow (Android)
  elevation: 3,

  // subtle shadow (iOS)
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

sectionTitle: {
  marginBottom: 8,
  fontWeight: '600',
},

aboutText: {
  lineHeight: 22,
  marginBottom: 12,
},

tagsWrapper: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 4,
},

tagChip: {
  backgroundColor: '#F5F7FA',
  paddingHorizontal: 14,
  paddingVertical: 6,
  borderRadius: 18,
  marginRight: 8,
  marginBottom: 8,
  borderWidth: 1,
  borderColor: '#E3E6EA',
},


});