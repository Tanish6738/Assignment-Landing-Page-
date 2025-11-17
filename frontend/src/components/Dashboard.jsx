import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { LogOut, LayoutDashboard, FolderKanban, Users, Mail, MessageSquare } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <header className="bg-white shadow-md border-b border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent">
              User Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-[#4A4A4A]">{user?.name}</p>
                <p className="text-xs text-[#6B6B6B]">{user?.email}</p>
                {isAdmin() && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#F5EFE0] text-[#C4A962]">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-[#D4534F] to-[#C43A36] hover:from-[#C43A36] hover:to-[#D4534F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4534F] focus:ring-offset-2 shadow-md hover:shadow-lg transition-all duration-300">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E8DCC4]">
          <h2 className="text-2xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            Welcome back, {user?.name}!
          </h2>
          
          <div className="space-y-6">
            <p className="text-[#6B6B6B]">
              You are successfully logged in to the platform.
            </p>

            {isAdmin() && (
              <div className="border-t border-[#E8DCC4] pt-6">
                <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-[#C4A962]" />
                  Admin Quick Access
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate('/admin/projects')}
                    className="p-6 bg-[#F5EFE0] hover:bg-[#E8DCC4] rounded-xl text-left transition-all group border border-[#E8DCC4]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-linear-to-r from-[#C4A962] to-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <FolderKanban className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#4A4A4A]">Manage Projects</h4>
                    </div>
                    <p className="text-sm text-[#6B6B6B]">Create, edit, and delete projects</p>
                  </button>
                  
                  <button
                    onClick={() => navigate('/admin/clients')}
                    className="p-6 bg-[#F5EFE0] hover:bg-[#E8DCC4] rounded-xl text-left transition-all group border border-[#E8DCC4]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-linear-to-r from-[#C4A962] to-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#4A4A4A]">Manage Clients</h4>
                    </div>
                    <p className="text-sm text-[#6B6B6B]">Create, edit, and delete clients</p>
                  </button>
                  
                  <button
                    onClick={() => navigate('/admin/contacts')}
                    className="p-6 bg-[#F5EFE0] hover:bg-[#E8DCC4] rounded-xl text-left transition-all group border border-[#E8DCC4]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-linear-to-r from-[#C4A962] to-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#4A4A4A]">Contact Submissions</h4>
                    </div>
                    <p className="text-sm text-[#6B6B6B]">View contact form submissions</p>
                  </button>
                  
                  <button
                    onClick={() => navigate('/admin/newsletter')}
                    className="p-6 bg-[#F5EFE0] hover:bg-[#E8DCC4] rounded-xl text-left transition-all group border border-[#E8DCC4]"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-linear-to-r from-[#C4A962] to-[#D4AF37] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-semibold text-[#4A4A4A]">Newsletter Subscribers</h4>
                    </div>
                    <p className="text-sm text-[#6B6B6B]">Manage newsletter subscribers</p>
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-[#E8DCC4] pt-6">
              <h3 className="text-lg font-semibold text-[#4A4A4A] mb-4">Quick Links</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="px-4 py-2 bg-[#F5EFE0] hover:bg-[#E8DCC4] rounded-lg text-sm font-medium text-[#4A4A4A] transition-colors border border-[#E8DCC4]"
                >
                  ← Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
