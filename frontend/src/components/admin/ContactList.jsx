import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { Trash2, Loader, Mail, Phone, MapPin, Calendar, Search, Filter } from 'lucide-react';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await adminService.contacts.getAll();
      const data = response.submissions || [];
      setContacts(data);
      setFilteredContacts(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch contact forms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = contacts;

    if (searchTerm) {
      result = result.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.mobile.includes(searchTerm) ||
        contact.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCity) {
      result = result.filter(contact =>
        contact.city.toLowerCase() === filterCity.toLowerCase()
      );
    }

    setFilteredContacts(result);
  }, [searchTerm, filterCity, contacts]);

  const uniqueCities = [...new Set(contacts.map(c => c.city))].sort();

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact form?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await adminService.contacts.delete(id);
      setContacts(contacts.filter(contact => contact._id !== id));
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete contact form');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 pb-4 border-b-2 border-[#E8DCC4]">
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Contact Submissions</h1>
        <p className="text-[#6B6B6B] mt-2 text-sm md:text-base font-medium">View and manage contact form submissions</p>
      </div>

      <div className="bg-white shadow-lg p-4 mb-6 border-2 border-[#E8DCC4] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37]"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
            <input
              type="text"
              placeholder="Search by name, email, mobile, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent appearance-none bg-[#FAF8F3]"
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {(searchTerm || filterCity) && (
          <div className="mt-3 text-sm text-[#6B6B6B]">
            Showing {filteredContacts.length} of {contacts.length} submissions
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-lg">
          <p className="text-sm text-[#D4534F]">{error}</p>
        </div>
      )}

      {filteredContacts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-[#E8DCC4]">
          <p className="text-[#6B6B6B]">
            {contacts.length === 0 ? 'No contact forms submitted yet.' : 'No results found for your search.'}
          </p>
          {(searchTerm || filterCity) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCity('');
              }}
              className="mt-4 px-4 py-2 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white rounded-lg hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300 shadow-md"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-lg overflow-hidden border-2 border-[#E8DCC4]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5EFE0] border-b-2 border-[#E8DCC4]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Mobile & City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Submitted At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC4]">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-[#4A4A4A]">
                          {contact.fullName}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#6B6B6B] mt-1">
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm text-[#4A4A4A]">
                          <Phone className="w-4 h-4" />
                          {contact.mobile}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
                          <MapPin className="w-4 h-4" />
                          {contact.city}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
                        <Calendar className="w-4 h-4" />
                        {formatDate(contact.submittedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        disabled={deleteLoading === contact._id}
                        className="flex items-center gap-2 px-3 py-2 bg-[#FFF5F5] text-[#D4534F] rounded-lg hover:bg-[#FFE5E5] transition-colors disabled:opacity-50"
                      >
                        {deleteLoading === contact._id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredContacts.length > 0 && (
        <div className="mt-4 text-sm text-[#6B6B6B]">
          Showing {filteredContacts.length} {filteredContacts.length !== contacts.length && `of ${contacts.length}`} submissions
        </div>
      )}
    </div>
  );
};

export default ContactList;
