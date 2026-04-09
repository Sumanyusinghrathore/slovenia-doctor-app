import axios from 'axios';
import { API_ENDPOINTS, buildApiUrl } from '../config/api';

export type UserRole = 'admin' | 'doctor' | 'compounder' | 'patient';

export interface LoginResponse {
  token: string;
  role: UserRole;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface PatientProfile {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  address?: string;
  emergencyContact?: string;
}

export interface PatientProfileUpdatePayload {
  name: string;
  phone: string;
  age: number | null;
  gender: string;
  address: string;
  emergencyContact: string;
}

export interface DoctorRequestPayload {
  doctorId: string;
  problem: string;
}

export interface DoctorDashboardResponse {
  totalCompounders: number;
  totalHomeVisits: number;
}

export interface CompounderDashboardResponse {
  totalVisits: number;
}

export interface RelatedUser {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: string;
  address?: string;
  emergencyContact?: string;
}

export interface DoctorRequestItem {
  _id: string;
  patientId?: RelatedUser;
  doctorId?: string;
  problem?: string;
  status?: 'pending' | 'accepted' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

export interface DoctorRequestResponsePayload {
  requestId: string;
  status: 'accepted' | 'rejected';
}

export interface CompounderProfile {
  _id?: string;
  userId?: RelatedUser;
  doctorId?: {
    _id?: string;
    specialization?: string;
    experience?: number;
    userId?: RelatedUser;
  };
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface HomeVisitItem {
  _id: string;
  patientId?: RelatedUser;
  doctorId?: string;
  compounderId?: string;
  address?: string;
  visitDate?: string;
  status?: 'assigned' | 'on_the_way' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface CompounderItem {
  _id: string;
  userId?: RelatedUser;
  isAvailable?: boolean;
  createdAt?: string;
}

const getAuthHeaders = (token?: string) => ({
  accept: 'application/json',
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const extractApiError = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const apiMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.details;

    if (status && apiMessage) {
      return `${status}: ${apiMessage}`;
    }

    if (status) {
      return `${status}: ${error.message || fallbackMessage}`;
    }

    return (
      apiMessage ||
      error.message ||
      fallbackMessage
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

export const staffApi = {
  async healthCheck() {
    const response = await axios.get(buildApiUrl(API_ENDPOINTS.health));
    return response.data;
  },

  async login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(
        buildApiUrl(API_ENDPOINTS.login),
        { email, password },
        { headers: getAuthHeaders() },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Login failed'));
    }
  },

  async getProfile(token: string) {
    try {
      const response = await axios.get<PatientProfile>(
        buildApiUrl(API_ENDPOINTS.patientProfile),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load profile'));
    }
  },

  async updateProfile(token: string, payload: PatientProfileUpdatePayload) {
    try {
      const response = await axios.put<{ message: string; profile: PatientProfile }>(
        buildApiUrl(API_ENDPOINTS.patientProfile),
        payload,
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to update profile'));
    }
  },

  async requestDoctor(token: string, payload: DoctorRequestPayload) {
    try {
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.patientRequestDoctor),
        payload,
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to send doctor request'));
    }
  },

  async getDoctorDashboard(token: string) {
    try {
      const response = await axios.get<DoctorDashboardResponse>(
        buildApiUrl(API_ENDPOINTS.doctorDashboard),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load doctor dashboard'));
    }
  },

  async getDoctorRequests(token: string) {
    try {
      const response = await axios.get<DoctorRequestItem[]>(
        buildApiUrl(API_ENDPOINTS.doctorRequests),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load doctor requests'));
    }
  },

  async respondToDoctorRequest(
    token: string,
    payload: DoctorRequestResponsePayload,
  ) {
    try {
      const response = await axios.post<{ message: string }>(
        buildApiUrl(API_ENDPOINTS.doctorRequestRespond),
        payload,
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to update request status'));
    }
  },

  async getDoctorCompounders(token: string) {
    try {
      const response = await axios.get<CompounderItem[]>(
        buildApiUrl(API_ENDPOINTS.doctorCompounders),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load compounders'));
    }
  },

  async getCompounderDashboard(token: string) {
    try {
      const response = await axios.get<CompounderDashboardResponse>(
        buildApiUrl(API_ENDPOINTS.compounderDashboard),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(
        extractApiError(error, 'Unable to load compounder dashboard'),
      );
    }
  },

  async getCompounderProfile(token: string) {
    try {
      const response = await axios.get<CompounderProfile>(
        buildApiUrl(API_ENDPOINTS.compounderProfile),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load compounder profile'));
    }
  },

  async getCompounderHomeVisits(token: string) {
    try {
      const response = await axios.get<HomeVisitItem[]>(
        buildApiUrl(API_ENDPOINTS.compounderHomeVisits),
        { headers: getAuthHeaders(token) },
      );
      return response.data;
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to load home visits'));
    }
  },

  async askAi(messages: Array<{ role: 'user' | 'assistant'; content: string }>) {
    try {
      const response = await axios.post(
        buildApiUrl(API_ENDPOINTS.aiChat),
        {
          messages,
          config: {
            maxTokens: 800,
            temperature: 0.2,
          },
        },
        { headers: getAuthHeaders() },
      );

      return (
        response.data?.reply ||
        response.data?.message ||
        response.data?.response ||
        'No response from server.'
      );
    } catch (error) {
      throw new Error(extractApiError(error, 'Unable to get AI response'));
    }
  },
};

export const patientApi = staffApi;
