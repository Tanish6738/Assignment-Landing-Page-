import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import AppRoutes from './Routes/AppRoutes';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;