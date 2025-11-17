import axiosInstance from '../config/axios';

const authService = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  adminLogin: async (credentials) => {
    const response = await axiosInstance.post('/admin/login', credentials);
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response;
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAdmin: () => {
    const user = authService.getStoredUser();
    return user?.role === 'admin';
  }
};

export default authService;
