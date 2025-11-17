import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

// Import components
import Login from '../components/Login';
import Register from '../components/Register';
import AdminLogin from '../components/AdminLogin';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

// Import admin components
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../components/admin/AdminDashboard';
import ClientList from '../components/admin/ClientList';
import ClientForm from '../components/admin/ClientForm';
import ClientEdit from '../components/admin/ClientEdit';
import ProjectList from '../components/admin/ProjectList';
import ProjectForm from '../components/admin/ProjectForm';
import ProjectEdit from '../components/admin/ProjectEdit';
import ContactList from '../components/admin/ContactList';
import NewsletterList from '../components/admin/NewsletterList';

// Import public components
import LandingPage from '../components/LandingPage';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Landing Page - Main Public Route */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to="/dashboard" replace /> : <Register />} 
      />
      <Route 
        path="/admin-login" 
        element={user ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Admin Protected Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        } 
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        
        {/* Client Routes */}
        <Route path="clients" element={<ClientList />} />
        <Route path="clients/create" element={<ClientForm />} />
        <Route path="clients/edit/:id" element={<ClientEdit />} />
        
        {/* Project Routes */}
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/create" element={<ProjectForm />} />
        <Route path="projects/edit/:id" element={<ProjectEdit />} />
        
        {/* Contact & Newsletter Routes */}
        <Route path="contacts" element={<ContactList />} />
        <Route path="newsletter" element={<NewsletterList />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;