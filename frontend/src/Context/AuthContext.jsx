import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      // Check if user is stored in localStorage
      const storedUser = authService.getStoredUser();
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        // Verify token is still valid by fetching current user
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser.user);
        } catch (err) {
          // Token is invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Admin login function
  const adminLogin = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await authService.adminLogin(credentials);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      setUser(response.user);
      return response.user;
    } catch (err) {
      console.error('Refresh user error:', err);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    adminLogin,
    logout,
    isAuthenticated,
    isAdmin,
    refreshUser,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;