import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueries } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomHeader from '../../../components/Header/CustomHeader';
import { genericStyles, FONTS, COLORS } from '../../../constants';
import { fetchData, endpoints } from '../../../helper/function';

/* ================= TYPES ================= */

interface Transaction {
  id: string;
  amount: string;
  date: string;
  travel_date: string;
  type: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
}

interface StoredUser {
  token: string;
}

/* ================= HELPERS ================= */

const isFutureDate = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const travelDate = new Date(dateString);
  travelDate.setHours(0, 0, 0, 0);

  return travelDate > today;
};

/* ================= SCREEN ================= */

const UserTransactions = () => {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [filter, setFilter] = useState<
    'ALL' | 'SUCCESS' | 'FAILED' | 'PENDING'
  >('ALL');

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
  const transactions: Transaction[] = profile?.transactions || [];

  /* ================= FILTER ================= */

  const filteredTransactions = useMemo(() => {
    if (filter === 'ALL') return transactions;
    return transactions.filter(t => t.status === filter);
  }, [transactions, filter]);

  /* ================= TOTAL ================= */

  const totalSpent = useMemo(
    () =>
      transactions.reduce(
        (sum, t) => sum + Number(t.amount.replace('₹', '')),
        0,
      ),
    [transactions],
  );

  /* ================= REFUND ================= */

  const handleRefund = (transactionId: string) => {
    Alert.alert(
      'Refund Request',
      `Refund requested for transaction ${transactionId}`,
    );
    // 🔥 Future: Refund API call
  };

  /* ================= UI ================= */

  return (
    <SafeAreaView style={genericStyles.container}>
      {/* <CustomHeader title="My Transactions" /> */}

      <ScrollView contentContainerStyle={styles.container}>
        {/* ===== SUMMARY ===== */}
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total Transactions: {transactions.length}
          </Text>
          <Text style={styles.summaryText}>
            Total Spent: ₹{totalSpent.toLocaleString()}
          </Text>
        </View>

        {/* ===== FILTER BUTTONS ===== */}
        <View style={styles.filters}>
          {['ALL', 'SUCCESS', 'PENDING', 'FAILED'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterBtn,
                filter === item && styles.filterActive,
              ]}
              onPress={() => setFilter(item as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === item && styles.filterTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ===== TRANSACTION LIST ===== */}
        {filteredTransactions.map(item => {
          const canRefund =
            item.status === 'SUCCESS' &&
            isFutureDate(item.travel_date);

          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.type}>{item.type}</Text>
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

              <Row label="Booking ID" value={item.id} />
              <Row label="Amount" value={item.amount} />
              <Row label="Booking Date" value={item.date} />
              <Row
                label="Travel Date"
                value={new Date(item.travel_date).toLocaleString()}
              />

              {/* ===== REFUND BUTTON ===== */}
              {canRefund && (
                <TouchableOpacity
                  style={styles.refundBtn}
                  onPress={() => handleRefund(item.id)}
                >
                  <Text style={styles.refundText}>Request Refund</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {filteredTransactions.length === 0 && (
          <Text style={styles.empty}>No transactions found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserTransactions;

/* ================= COMPONENTS ================= */

const Row = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  summary: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  summaryText: {
    fontFamily: FONTS.AxiformaSemiBold,
    marginBottom: 4,
  },

  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#E5E7EB',
  },
  filterActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
  },
  filterTextActive: {
    color: COLORS.white,
    fontFamily: FONTS.AxiformaSemiBold,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  type: {
    fontFamily: FONTS.AxiformaSemiBold,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
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

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowLabel: {
    color: COLORS.gray,
    fontFamily: FONTS.AxiformaRegular,
  },
  rowValue: {
    textAlign: 'right',
    maxWidth: '60%',
    fontFamily: FONTS.AxiformaRegular,
  },

  refundBtn: {
    marginTop: 10,
    backgroundColor: '#DC2626',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  refundText: {
    color: COLORS.white,
    fontFamily: FONTS.AxiformaSemiBold,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: COLORS.gray,
  },
});
