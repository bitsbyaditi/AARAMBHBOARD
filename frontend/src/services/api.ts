import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Updated to match FastAPI prefix

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Token injection
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ✅ Real API calls
export const authAPI = {
  login: async (email: string, password: string) => {
    return api.post('/auth/login', { email, password }); // Replace with real route
  },
};

export const layoutAPI = {
  saveLayout: async (userId: string, layout: any[]) => {
    return api.post('/dashboard/save', { user_id: userId, config: layout });
  },
  loadLayout: async (userId: string) => {
    return api.get(`/dashboard/load/${userId}`);
  },
};

export default api;
