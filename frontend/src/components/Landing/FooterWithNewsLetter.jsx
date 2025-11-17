import React, { useState } from 'react';
import { newsletterService } from '../../services';
import { Mail, Loader, CheckCircle, Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const FooterWithNewsLetter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await newsletterService.subscribe({ email });
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#2A2A2A] text-white">
      <div className="bg-linear-to-r from-[#C4A962] to-[#D4AF37] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-[#FAF8F3]/90 mb-8">
              Stay updated with our latest news, projects, and insights delivered to your inbox.
            </p>

            {success && (
              <div className="mb-6 p-4 bg-[#E8F5E9] text-[#2E7D32] rounded-xl flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <p className="text-sm font-medium">Thank you for subscribing!</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-[#FFF5F5] text-[#D4534F] rounded-xl">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 border px-6 py-4 rounded-xl border-amber-50 focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-white text-[#C4A962] font-semibold rounded-xl hover:bg-[#FAF8F3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>

            <p className="text-xs text-[#FAF8F3]/80 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 border-t border-[#3A3A3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold mb-4 bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent">Creative Digital Solutions</h4>
              <p className="text-[#B0B0B0] mb-6 max-w-md">
                Transforming ideas into exceptional digital experiences. We craft innovative solutions that drive growth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-[#3A3A3A] hover:bg-[#C4A962] rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#3A3A3A] hover:bg-[#C4A962] rounded-full flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#3A3A3A] hover:bg-[#C4A962] rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#3A3A3A] hover:bg-[#C4A962] rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-[#3A3A3A] hover:bg-[#C4A962] rounded-full flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#C4A962]">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#B0B0B0] hover:text-[#C4A962] transition-colors">About Us</a></li>
                <li><a href="#projects" className="text-[#B0B0B0] hover:text-[#C4A962] transition-colors">Projects</a></li>
                <li><a href="#" className="text-[#B0B0B0] hover:text-[#C4A962] transition-colors">Services</a></li>
                <li><a href="#" className="text-[#B0B0B0] hover:text-[#C4A962] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4 text-[#C4A962]">Services</h5>
              <ul className="space-y-2">
                <li><span className="text-[#B0B0B0]">Web Development</span></li>
                <li><span className="text-[#B0B0B0]">Mobile Apps</span></li>
                <li><span className="text-[#B0B0B0]">UI/UX Design</span></li>
                <li><span className="text-[#B0B0B0]">Consulting</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#3A3A3A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#B0B0B0] text-sm">
            © {new Date().getFullYear()} Creative Digital Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithNewsLetter;