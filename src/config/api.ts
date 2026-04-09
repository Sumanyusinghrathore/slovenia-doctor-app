const PROD_API_BASE_URL = 'https://janseva-server.vercel.app/api/';

// Android emulator ke liye host machine ka localhost `10.0.2.2` hota hai.
// Agar physical device use kar rahe ho to is URL ko machine ke LAN IP se replace karo.
const DEV_API_BASE_URL = 'https://janseva-server.vercel.app/api/';

export const API_BASE_URL = __DEV__ ? DEV_API_BASE_URL : PROD_API_BASE_URL;

export const API_ENDPOINTS = {
  health: 'health',
  login: 'auth/login',
  patientProfile: 'patient/profile',
  patientRequestDoctor: 'patient/request-doctor',
  doctorDashboard: 'doctor/dashboard',
  doctorRequests: 'doctor/requests',
  doctorRequestRespond: 'doctor/request/respond',
  doctorCompounders: 'doctor/compounders',
  compounderDashboard: 'compounder/dashboard',
  compounderProfile: 'compounder/profile',
  compounderHomeVisits: 'compounder/home-visits',
  aiChat: 'ai/chat',
} as const;

export const buildApiUrl = (endpoint: string) =>
  `${API_BASE_URL}/${endpoint.replace(/^\/+/, '')}`;
