import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const trafficAPI = {
  getLiveData: () => api.get('/traffic/live'),
  getJunctionDetail: (id: string) => api.get(`/traffic/junction/${id}`),
};

export const predictionsAPI = {
  predict: (params: Record<string, unknown>) => api.post('/predictions/predict', params),
};

export const simulationAPI = {
  runSimulation: (params: Record<string, unknown>) => api.post('/simulation/run', params),
};

export const incidentsAPI = {
  getAll: () => api.get('/incidents'),
  create: (data: Record<string, unknown>) => api.post('/incidents', data),
  updateStatus: (id: string, status: string) => api.patch(`/incidents/${id}`, { status }),
};

export const analyticsAPI = {
  getHourly: (params: Record<string, unknown>) => api.get('/analytics/hourly', { params }),
  getJunctionPerformance: () => api.get('/analytics/junctions'),
};

export default api;
