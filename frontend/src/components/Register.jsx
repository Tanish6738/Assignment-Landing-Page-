import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { UserPlus, User, Mail, Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSuccessMessage('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setLocalError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setLocalError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8DCC4]">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-[#C4A962] to-[#D4AF37] rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="mt-2 text-[#6B6B6B]">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#C4A962] hover:text-[#D4AF37] transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {(localError || error) && (
              <div className="rounded-xl bg-[#FFF5F5] border border-[#D4534F]/20 p-4">
                <p className="text-sm text-[#D4534F] font-medium">{localError || error}</p>
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl bg-[#E8F5E9] border border-[#2E7D32]/20 p-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                <p className="text-sm text-[#2E7D32] font-medium">{successMessage}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-[#9B9B9B]" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#E8DCC4] rounded-xl bg-[#FAF8F3] text-[#4A4A4A] placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#9B9B9B]" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#E8DCC4] rounded-xl bg-[#FAF8F3] text-[#4A4A4A] placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#9B9B9B]" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#E8DCC4] rounded-xl bg-[#FAF8F3] text-[#4A4A4A] placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#4A4A4A] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-[#9B9B9B]" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#E8DCC4] rounded-xl bg-[#FAF8F3] text-[#4A4A4A] placeholder-[#9B9B9B] focus:outline-none focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-[#D4AF37] hover:to-[#C4A962] focus:outline-none focus:ring-2 focus:ring-[#C4A962] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
