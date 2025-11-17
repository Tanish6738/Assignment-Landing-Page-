import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { FolderKanban, Users, Mail, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    {
      title: 'Projects',
      description: 'Manage your portfolio projects',
      icon: FolderKanban,
      path: '/admin/projects',
      color: 'blue'
    },
    {
      title: 'Clients',
      description: 'Manage client testimonials',
      icon: Users,
      path: '/admin/clients',
      color: 'green'
    },
    {
      title: 'Contact Forms',
      description: 'View contact submissions',
      icon: MessageSquare,
      path: '/admin/contacts',
      color: 'purple'
    },
    {
      title: 'Newsletter',
      description: 'Manage newsletter subscribers',
      icon: Mail,
      path: '/admin/newsletter',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      green: 'bg-green-50 text-green-600 hover:bg-green-100',
      purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-[#C4A962] to-[#D4AF37]"></div>
        <div className="pl-6 border-l-4 border-[#E8DCC4]">
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent tracking-tight">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-[#6B6B6B] mt-2 text-sm md:text-base font-medium">
            Manage your portfolio content from this dashboard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.path}
              onClick={() => navigate(card.path)}
              className="group bg-white shadow-lg p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-[#E8DCC4] hover:border-[#C4A962] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-[#C4A962]/10 to-transparent transform rotate-45 translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-300"></div>
              <div className={`w-14 h-14 ${getColorClasses(card.color)} flex items-center justify-center mb-4 relative clip-path-hexagon border-2 border-current`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#4A4A4A] mb-2 tracking-tight uppercase text-xs md:text-sm">
                {card.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] font-medium">
                {card.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-[#C4A962] to-[#D4AF37] group-hover:w-full transition-all duration-500"></div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white shadow-lg p-4 md:p-6 border-2 border-[#E8DCC4] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] via-[#D4AF37] to-[#C4A962]"></div>
        <h2 className="font-bold text-[#4A4A4A] mb-6 uppercase tracking-wider text-sm md:text-base border-l-4 border-[#C4A962] pl-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/admin/projects/create')}
            className="group relative px-4 py-4 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white hover:from-[#D4AF37] hover:to-[#C4A962] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left shadow-lg overflow-hidden border-l-4 border-[#D4AF37]"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300"></div>
            <p className="font-bold uppercase tracking-wide text-sm">Create New Project</p>
            <p className="text-sm text-white/95 mt-1.5 font-medium">Add a new project to your portfolio</p>
          </button>
          <button
            onClick={() => navigate('/admin/clients/create')}
            className="group relative px-4 py-4 bg-linear-to-r from-[#8B7355] to-[#A0826D] text-white hover:from-[#A0826D] hover:to-[#8B7355] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-left shadow-lg overflow-hidden border-l-4 border-[#A0826D]"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 transform rotate-45 translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300"></div>
            <p className="font-bold uppercase tracking-wide text-sm">Add New Client</p>
            <p className="text-sm text-white/95 mt-1.5 font-medium">Add a new client testimonial</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
