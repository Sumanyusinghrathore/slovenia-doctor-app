import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';

import Label from '../../components/Label/Labels';
import { COLORS, FONTS, genericStyles } from '../../constants';
import { useApp } from '../../context/AppContext';
import { staffApi } from '../../services/patientApi';
import type { HomeVisitItem } from '../../services/patientApi';

const formatDate = (value?: string) => {
  if (!value) {
    return 'Not scheduled';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const CompounderWorkspace = () => {
  const { userData } = useApp();
  const token = userData?.token;

  const dashboardQuery = useQuery(
    ['compounder-dashboard', token],
    () => staffApi.getCompounderDashboard(token!),
    { enabled: Boolean(token) },
  );

  const profileQuery = useQuery(
    ['compounder-profile', token],
    () => staffApi.getCompounderProfile(token!),
    { enabled: Boolean(token) },
  );

  const visitsQuery = useQuery(
    ['compounder-home-visits', token],
    () => staffApi.getCompounderHomeVisits(token!),
    { enabled: Boolean(token) },
  );

  const visits: HomeVisitItem[] = visitsQuery.data || [];

  return (
    <SafeAreaView style={genericStyles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={
              dashboardQuery.isRefetching ||
              profileQuery.isRefetching ||
              visitsQuery.isRefetching
            }
            onRefresh={() => {
              dashboardQuery.refetch();
              profileQuery.refetch();
              visitsQuery.refetch();
            }}
          />
        }
      >
        <Label
          labelContent={`Welcome, ${userData?.name || 'Compounder'}`}
          family={FONTS.AxiformaBold}
          size={24}
          color={COLORS.primary}
          mb={6}
        />
        <Label
          labelContent="Assigned visits aur required case details ab backend se dynamically load ho rahe hain."
          family={FONTS.AxiformaRegular}
          size={13}
          color={COLORS.textGray}
          mb={20}
        />

        <View style={styles.statCard}>
          <Label labelContent="Total Assigned Visits" family={FONTS.AxiformaMedium} size={13} color={COLORS.textGray} mb={8} />
          <Label
            labelContent={String(dashboardQuery.data?.totalVisits || visits.length || 0)}
            family={FONTS.AxiformaBold}
            size={30}
            color={COLORS.primary}
          />
        </View>

        <View style={styles.profileCard}>
          <Label labelContent="Reporting Doctor" family={FONTS.AxiformaMedium} size={13} color={COLORS.textGray} mb={8} />
          <Label
            labelContent={profileQuery.data?.doctorId?.userId?.name || 'Doctor not linked'}
            family={FONTS.AxiformaBold}
            size={18}
            color={COLORS.black}
            mb={6}
          />
          <Label
            labelContent={profileQuery.data?.doctorId?.userId?.email || 'Email not available'}
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.textGray}
            mb={4}
          />
          <Label
            labelContent={`Specialization: ${profileQuery.data?.doctorId?.specialization || '-'}`}
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.textGray}
            mb={4}
          />
          <Label
            labelContent={`Experience: ${profileQuery.data?.doctorId?.experience || 0} years`}
            family={FONTS.AxiformaRegular}
            size={13}
            color={COLORS.textGray}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Label labelContent="Assigned Visits" family={FONTS.AxiformaBold} size={18} color={COLORS.black} />
          {visitsQuery.isLoading ? <ActivityIndicator color={COLORS.primary} /> : null}
        </View>

        {!visitsQuery.isLoading && visits.length === 0 ? (
          <View style={styles.emptyCard}>
            <Label
              labelContent="Abhi tak koi home visit assign nahi hui. Jaise hi visit assign hogi, required case details yahan live dikhenge."
              family={FONTS.AxiformaRegular}
              size={13}
              color={COLORS.textGray}
            />
          </View>
        ) : null}

        {visits.map(visit => {
          const requester = visit.patientId;

          return (
            <View key={visit._id} style={styles.visitCard}>
              <View style={styles.badgeRow}>
                <Label labelContent={visit.status || 'assigned'} family={FONTS.AxiformaMedium} size={12} color={COLORS.primary} />
                <Label labelContent={formatDate(visit.visitDate)} family={FONTS.AxiformaRegular} size={12} color={COLORS.textGray} />
              </View>

              <Label labelContent={requester?.name || 'Unnamed case'} family={FONTS.AxiformaBold} size={18} color={COLORS.black} mb={6} />
              <Label labelContent={requester?.email || 'Email not available'} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={4} />
              <Label labelContent={`Phone: ${requester?.phone || 'Not added yet'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Age / Gender: ${requester?.age || '-'} / ${requester?.gender || '-'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Address: ${visit.address || requester?.address || 'Not available'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Emergency Contact: ${requester?.emergencyContact || 'Not added yet'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  statCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  profileCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  visitCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default CompounderWorkspace;
