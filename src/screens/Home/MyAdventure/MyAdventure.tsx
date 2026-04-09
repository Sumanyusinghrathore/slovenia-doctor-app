import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueries } from 'react-query';

import CustomHeader from '../../../components/Header/CustomHeader';
import { genericStyles, FONTS, COLORS } from '../../../constants';
import { endpoints, fetchData } from '../../../helper/function';

/* ================= TYPES ================= */

interface CareRecord {
  id: string;
  title: string;
  date: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  price: string;
  image: string;
}

interface StoredUser {
  token: string;
}

/* ================= SCREEN ================= */

const MyAdventure = () => {
  const [user, setUser] = useState<StoredUser | null>(null);

  /* 🔐 Load token */
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    loadUser();
  }, []);

  /* 👤 Profile API */
  const results = useQueries([
    {
      queryKey: ['user-profile', user?.token],
      queryFn: () =>
        fetchData(endpoints.GET_PROFILE, '', user?.token, 'get', true),
      enabled: Boolean(user?.token),
    },
  ]);

  const profile = results[0]?.data?.data || {};
  const careRecords: CareRecord[] =
    profile?.careRecords || profile?.appointments || profile?.adventures || [];

  /* ================= UI ================= */

  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title="My Adventures" /> */}

      <ScrollView contentContainerStyle={styles.container}>
        {careRecords.map(item => (
          <View key={item.id} style={styles.card}>
            {/* IMAGE */}
            <Image
              source={{
                uri: item.image.startsWith('http')
                  ? item.image
                  : 'https://via.placeholder.com/300',
              }}
              style={styles.image}
            />

            {/* CONTENT */}
            <View style={styles.content}>
              <View style={styles.topRow}>
                <Text style={styles.title}>{item.title}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === 'SUCCESS'
                      ? styles.success
                      : item.status === 'FAILED'
                      ? styles.failed
                      : styles.pending,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <Text style={styles.date}>📅 {item.date}</Text>
              <Text style={styles.price}>₹ {item.price}</Text>

              {/* ACTION */}
              {/* <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        ))}

        {careRecords.length === 0 && (
          <Text style={styles.empty}>No care records available yet</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAdventure;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#E5E7EB',
  },

  content: {
    padding: 14,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },

  title: {
    fontFamily: FONTS.AxiformaSemiBold,
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },

  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  success: {
    backgroundColor: '#DCFCE7',
    color: '#166534',
  },
  failed: {
    backgroundColor: '#FEE2E2',
    color: '#991B1B',
  },
  pending: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },

  date: {
    fontFamily: FONTS.AxiformaRegular,
    color: COLORS.gray,
    marginBottom: 4,
  },

  price: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.AxiformaSemiBold,
  },

  empty: {
    textAlign: 'center',
    marginTop: 50,
    fontFamily: FONTS.AxiformaRegular,
    color: COLORS.gray,
  },
});
