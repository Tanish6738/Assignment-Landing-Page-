import React, { useState } from 'react';
import { Menu, X, Home, FolderKanban, Users, Mail, LogIn, UserPlus, LogOut, LayoutDashboard, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, sectionId: 'hero' },
    { name: 'Projects', icon: FolderKanban, sectionId: 'projects' },
    { name: 'Clients', icon: Users, sectionId: 'clients' },
    { name: 'Contact', icon: Mail, sectionId: 'contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F3]/95 backdrop-blur-md shadow-md border-b border-[#E8DCC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold cursor-pointer bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300"
            >
              Portfolio
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </button>
            ))}
            
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[#E8DCC4]">
              {user ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="text-right mr-2">
                      <p className="text-sm font-medium text-[#4A4A4A]">{user.name}</p>
                      {isAdmin() && (
                        <span className="text-xs text-[#C4A962] font-semibold">Admin</span>
                      )}
                    </div>
                    {isAdmin() && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>
                    )}
                    {!isAdmin() && (
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#D4534F] to-[#C43A36] text-white rounded-lg hover:from-[#C43A36] hover:to-[#D4534F] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-5 py-2 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white rounded-lg hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[#4A4A4A] hover:bg-[#F5EFE0] transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#FAF8F3] border-t border-[#E8DCC4] shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.sectionId)}
                className="flex items-center gap-3 w-full px-4 py-3 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
            
            <div className="pt-3 border-t border-[#E8DCC4] space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-3 bg-[#F5EFE0] rounded-lg">
                    <p className="text-sm font-semibold text-[#4A4A4A]">{user.name}</p>
                    <p className="text-xs text-[#6B6B6B]">{user.email}</p>
                    {isAdmin() && (
                      <span className="inline-block mt-1 text-xs text-[#C4A962] font-semibold">Admin Account</span>
                    )}
                  </div>
                  
                  {isAdmin() ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                    >
                      <User className="w-5 h-5" />
                      My Profile
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-[#D4534F] to-[#C43A36] text-white rounded-lg font-semibold shadow-md"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 text-[#4A4A4A] hover:text-[#C4A962] hover:bg-[#F5EFE0] rounded-lg transition-all duration-300 font-medium"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white rounded-lg font-semibold shadow-md"
                  >
                    <UserPlus className="w-5 h-5" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
