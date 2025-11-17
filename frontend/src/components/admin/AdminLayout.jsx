import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Mail, 
  MessageSquare, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Projects',
      path: '/admin/projects',
      icon: FolderKanban
    },
    {
      name: 'Clients',
      path: '/admin/clients',
      icon: Users
    },
    {
      name: 'Contact Forms',
      path: '/admin/contacts',
      icon: MessageSquare
    },
    {
      name: 'Newsletter',
      path: '/admin/newsletter',
      icon: Mail
    }
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] pt-16">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white shadow-lg border-2 border-[#E8DCC4] hover:border-[#C4A962] hover:bg-[#F5EFE0] transition-all duration-200"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-[#4A4A4A]" /> : <Menu className="w-6 h-6 text-[#4A4A4A]" />}
      </button>

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl border-r-4 border-[#E8DCC4] transform transition-transform duration-300 ease-in-out z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b-2 border-[#E8DCC4] bg-linear-to-r from-[#FAF8F3] to-[#F5EFE0] relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37]"></div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Admin Panel</h2>
            <p className="text-sm text-[#6B6B6B] mt-1 font-medium">{user?.name}</p>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => {
                        navigate(item.path);
                        setSidebarOpen(false);
                      }}
                      className={`group w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 relative ${
                        active
                          ? 'bg-[#F5EFE0] text-[#C4A962] shadow-md border-l-4 border-[#C4A962]'
                          : 'text-[#4A4A4A] hover:bg-[#F5EFE0] hover:text-[#C4A962] border-l-4 border-transparent hover:border-[#E8DCC4]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t-2 border-[#E8DCC4]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-[#D4534F] hover:bg-[#FFF5F5] border-l-4 border-transparent hover:border-[#D4534F] transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      <main className="lg:ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
