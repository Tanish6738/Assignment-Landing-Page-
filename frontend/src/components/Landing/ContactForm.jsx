import React, { useState } from 'react';
import { contactService } from '../../services';
import { Send, Loader, CheckCircle, Mail, Phone, MapPin, User } from 'lucide-react';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (formData.fullName.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address (e.g., user@example.com)');
      return;
    }

    if (!formData.mobile) {
      setError('Please enter your mobile number');
      return;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(formData.mobile) || formData.mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid mobile number (at least 10 digits)');
      return;
    }

    if (!formData.city.trim()) {
      setError('Please enter your city');
      return;
    }

    if (formData.city.trim().length < 2) {
      setError('City name must be at least 2 characters');
      return;
    }

    try {
      setLoading(true);
      await contactService.submit(formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        city: ''
      });
    } catch (err) {
      setError(err.message || 'Failed to submit contact form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can help you achieve your goals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="hidden lg:block">
            <div className="bg-linear-to-br from-[#C4A962] to-[#D4AF37] rounded-3xl p-12 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-6">Let's work together</h3>
              <p className="text-[#FAF8F3]/90 mb-8 text-lg">
                We're here to help bring your vision to life. Fill out the form and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-[#FAF8F3]/80">hello@company.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-[#FAF8F3]/80">+1 234 567 8900</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className="text-[#FAF8F3]/80">123 Business St, City</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#E8DCC4]">
            {success && (
              <div className="mb-6 p-4 bg-[#E8F5E9] border border-[#A5D6A7] rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#2E7D32] " />
                <p className="text-sm text-[#2E7D32]">Thank you! We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-xl">
                <p className="text-sm text-[#D4534F]">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#E8DCC4] rounded-xl focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all bg-[#FAF8F3]"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 border border-[#E8DCC4] rounded-xl focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all bg-[#FAF8F3]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="mobile" className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-[#E8DCC4] rounded-xl focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all bg-[#FAF8F3]"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-[#4A4A4A] mb-2">
                    City
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-[#E8DCC4] rounded-xl focus:ring-2 focus:ring-[#C4A962] focus:border-transparent transition-all bg-[#FAF8F3]"
                      placeholder="New York"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white font-semibold rounded-xl hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;