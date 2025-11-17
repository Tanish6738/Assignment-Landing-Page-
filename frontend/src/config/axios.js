import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
      
      if (status === 403) {
        console.error('Access denied:', data.message);
      }
      
      return Promise.reject({
        message: data?.message || 'An error occurred',
        error: data?.error,
        status
      });
    } else if (error.request) {
      return Promise.reject({
        message: 'No response from server. Please check your connection.',
        error: error.message
      });
    } else {
      return Promise.reject({
        message: 'An unexpected error occurred',
        error: error.message
      });
    }
  }
);

export default axiosInstance;