import React, { useState, useEffect } from 'react';
import { clientService } from '../../services';
import { Users, Quote, Loader } from 'lucide-react';

const Client = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await clientService.getAll();
      setClients(response.clients || []);
      setError('');
    } catch (err) {
      setError('Failed to load clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-[#C4A962]" />
        </div>
      </section>
    );
  }

  if (error) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5EFE0] text-[#C4A962] rounded-full mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Hear from the amazing people we've had the pleasure to work with
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#6B6B6B]">No client testimonials available yet.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex animate-marquee hover:pause-marquee">
              {clients.map((client) => (
                <div
                  key={client._id}
                  className="shrink-0 w-96 mx-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#E8DCC4] h-full">
                    <div className="p-8">
                      <Quote className="w-10 h-10 text-[#C4A962] mb-4 opacity-50" />

                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-[#F5EFE0]"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=' + client.name.charAt(0);
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-[#4A4A4A]">{client.name}</h3>
                          <p className="text-sm text-[#C4A962] font-medium">{client.designation}</p>
                        </div>
                      </div>

                      <p className="text-[#6B6B6B] leading-relaxed">
                        "{client.description}"
                      </p>
                    </div>

                    <div className="h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
              
              {clients.map((client) => (
                <div
                  key={`duplicate-${client._id}`}
                  className="shrink-0 w-96 mx-4"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-[#E8DCC4] h-full">
                    <div className="p-8">
                      <Quote className="w-10 h-10 text-[#C4A962] mb-4 opacity-50" />

                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-[#F5EFE0]"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=' + client.name.charAt(0);
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-[#4A4A4A]">{client.name}</h3>
                          <p className="text-sm text-[#C4A962] font-medium">{client.designation}</p>
                        </div>
                      </div>

                      <p className="text-[#6B6B6B] leading-relaxed">
                        "{client.description}"
                      </p>
                    </div>

                    <div className="h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Client;