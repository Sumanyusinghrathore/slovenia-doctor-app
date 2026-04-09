import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useToast } from 'react-native-toast-notifications';

import Label from '../../components/Label/Labels';
import { COLORS, FONTS, genericStyles } from '../../constants';
import { useApp } from '../../context/AppContext';
import { staffApi } from '../../services/patientApi';
import type { DoctorRequestItem } from '../../services/patientApi';
import renderToast from '../../helper/renderToast';

const formatDate = (value?: string) => {
  if (!value) {
    return 'Not available';
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const DoctorWorkspace = () => {
  const { userData } = useApp();
  const toast = useToast();
  const queryClient = useQueryClient();
  const token = userData?.token;

  const dashboardQuery = useQuery(
    ['doctor-dashboard', token],
    () => staffApi.getDoctorDashboard(token!),
    { enabled: Boolean(token) },
  );

  const requestsQuery = useQuery(
    ['doctor-requests', token],
    () => staffApi.getDoctorRequests(token!),
    { enabled: Boolean(token) },
  );

  const compoundersQuery = useQuery(
    ['doctor-compounders', token],
    () => staffApi.getDoctorCompounders(token!),
    { enabled: Boolean(token) },
  );

  const responseMutation = useMutation(
    ({ requestId, status }: { requestId: string; status: 'accepted' | 'rejected' }) =>
      staffApi.respondToDoctorRequest(token!, { requestId, status }),
    {
      onSuccess: (data: { message: string }) => {
        renderToast(toast, data.message || 'Request updated', 'success');
        queryClient.invalidateQueries(['doctor-requests', token]);
      },
      onError: (error: any) => {
        renderToast(
          toast,
          error?.message || 'Unable to update request right now.',
          'danger',
        );
      },
    },
  );

  const requests: DoctorRequestItem[] = requestsQuery.data || [];
  const pendingCount = requests.filter(item => item.status === 'pending').length;

  return (
    <SafeAreaView style={genericStyles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={
              dashboardQuery.isRefetching ||
              requestsQuery.isRefetching ||
              compoundersQuery.isRefetching
            }
            onRefresh={() => {
              dashboardQuery.refetch();
              requestsQuery.refetch();
              compoundersQuery.refetch();
            }}
          />
        }
      >
        <Label
          labelContent={`Welcome, ${userData?.name || 'Doctor'}`}
          family={FONTS.AxiformaBold}
          size={24}
          color={COLORS.primary}
          mb={6}
        />
        <Label
          labelContent="Doctor dashboard requests, compounder assignments, aur care data backend APIs se load ho raha hai."
          family={FONTS.AxiformaRegular}
          size={13}
          color={COLORS.textGray}
          mb={20}
        />

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Label labelContent="Pending Requests" family={FONTS.AxiformaMedium} size={13} color={COLORS.textGray} mb={8} />
            <Label labelContent={String(pendingCount)} family={FONTS.AxiformaBold} size={28} color={COLORS.primary} />
          </View>
          <View style={styles.statCard}>
            <Label labelContent="Total Compounders" family={FONTS.AxiformaMedium} size={13} color={COLORS.textGray} mb={8} />
            <Label
              labelContent={String(dashboardQuery.data?.totalCompounders || compoundersQuery.data?.length || 0)}
              family={FONTS.AxiformaBold}
              size={28}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.statCard}>
            <Label labelContent="Home Visits" family={FONTS.AxiformaMedium} size={13} color={COLORS.textGray} mb={8} />
            <Label
              labelContent={String(dashboardQuery.data?.totalHomeVisits || 0)}
              family={FONTS.AxiformaBold}
              size={28}
              color={COLORS.primary}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Label labelContent="Care Requests" family={FONTS.AxiformaBold} size={18} color={COLORS.black} />
          {requestsQuery.isLoading ? <ActivityIndicator color={COLORS.primary} /> : null}
        </View>

        {!requestsQuery.isLoading && requests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Label
              labelContent="Abhi koi request nahi mili. Jaise hi backend se naya case assign hoga, yahan dynamic card show hoga."
              family={FONTS.AxiformaRegular}
              size={13}
              color={COLORS.textGray}
            />
          </View>
        ) : null}

        {requests.map(request => {
          const requester = request.patientId;
          const canRespond = request.status === 'pending' && !responseMutation.isLoading;

          return (
            <View key={request._id} style={styles.requestCard}>
              <View style={styles.badgeRow}>
                <Label labelContent={request.status || 'pending'} family={FONTS.AxiformaMedium} size={12} color={COLORS.primary} />
                <Label labelContent={`Requested: ${formatDate(request.createdAt)}`} family={FONTS.AxiformaRegular} size={12} color={COLORS.textGray} />
              </View>

              <Label
                labelContent={requester?.name || 'Unnamed case'}
                family={FONTS.AxiformaBold}
                size={18}
                color={COLORS.black}
                mb={6}
              />
              <Label labelContent={requester?.email || 'Email not available'} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={4} />
              <Label labelContent={`Phone: ${requester?.phone || 'Not added yet'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Age / Gender: ${requester?.age || '-'} / ${requester?.gender || '-'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Address: ${requester?.address || 'Not added yet'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={2} />
              <Label labelContent={`Emergency Contact: ${requester?.emergencyContact || 'Not added yet'}`} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={12} />

              <View style={styles.problemBox}>
                <Label labelContent="Problem" family={FONTS.AxiformaMedium} size={12} color={COLORS.primary} mb={6} />
                <Label labelContent={request.problem || 'No problem description shared.'} family={FONTS.AxiformaRegular} size={13} color={COLORS.black} />
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  disabled={!canRespond}
                  style={[styles.actionButton, styles.acceptButton, !canRespond && styles.disabledButton]}
                  onPress={() => responseMutation.mutate({ requestId: request._id, status: 'accepted' })}
                >
                  <Label labelContent="Accept" family={FONTS.AxiformaMedium} color={COLORS.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!canRespond}
                  style={[styles.actionButton, styles.rejectButton, !canRespond && styles.disabledButton]}
                  onPress={() => responseMutation.mutate({ requestId: request._id, status: 'rejected' })}
                >
                  <Label labelContent="Reject" family={FONTS.AxiformaMedium} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}

        <View style={styles.sectionHeader}>
          <Label labelContent="My Compounders" family={FONTS.AxiformaBold} size={18} color={COLORS.black} />
        </View>

        {(compoundersQuery.data || []).map(compounder => (
          <View key={compounder._id} style={styles.compounderCard}>
            <Label labelContent={compounder.userId?.name || 'Unnamed compounder'} family={FONTS.AxiformaMedium} size={16} color={COLORS.black} mb={4} />
            <Label labelContent={compounder.userId?.email || 'Email not available'} family={FONTS.AxiformaRegular} size={13} color={COLORS.textGray} mb={4} />
            <Label
              labelContent={compounder.isAvailable ? 'Available for visits' : 'Currently unavailable'}
              family={FONTS.AxiformaRegular}
              size={12}
              color={compounder.isAvailable ? COLORS.success : COLORS.red}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  statsRow: {
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
  requestCard: {
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
  problemBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: COLORS.success,
  },
  rejectButton: {
    backgroundColor: COLORS.red,
  },
  disabledButton: {
    opacity: 0.55,
  },
  compounderCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
});

export default DoctorWorkspace;
