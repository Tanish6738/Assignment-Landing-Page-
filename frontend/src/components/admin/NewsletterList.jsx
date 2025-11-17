import React, { useState, useEffect } from 'react';
import { adminService } from '../../services';
import { Trash2, Loader, Mail, Calendar, Download, Search, SortAsc, SortDesc } from 'lucide-react';

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await adminService.newsletters.getAll();
      const data = response.subscribers || [];
      setSubscribers(data);
      setFilteredSubscribers(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch newsletter subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...subscribers];

    if (searchTerm) {
      result = result.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.subscribedAt);
      const dateB = new Date(b.subscribedAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    setFilteredSubscribers(result);
  }, [searchTerm, sortOrder, subscribers]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this subscriber?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await adminService.newsletters.delete(id);
      setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete subscriber');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleExportEmails = () => {
    const emails = filteredSubscribers.map(sub => sub.email).join('\n');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 pb-4 border-b-2 border-[#E8DCC4]">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Newsletter</h1>
          <p className="text-[#6B6B6B] mt-2 text-sm md:text-base font-medium">Manage your newsletter subscriber list</p>
        </div>
        {filteredSubscribers.length > 0 && (
          <button
            onClick={handleExportEmails}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-[#8B7355] to-[#A0826D] text-white hover:from-[#A0826D] hover:to-[#8B7355] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg text-sm md:text-base whitespace-nowrap font-bold border-b-4 border-[#A0826D] hover:border-[#8B7355]"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export {searchTerm ? 'Filtered ' : ''}Emails</span>
            <span className="sm:hidden">Export</span>
          </button>
        )}
      </div>

      <div className="bg-white shadow-lg p-4 mb-6 border-2 border-[#E8DCC4] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37]"></div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9B9B]" />
            <input
              type="text"
              placeholder="Search by email address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            />
          </div>

          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-4 py-2 bg-[#F5EFE0] hover:bg-[#E8DCC4] text-[#4A4A4A] rounded-lg transition-colors whitespace-nowrap"
          >
            {sortOrder === 'desc' ? (
              <><SortDesc className="w-5 h-5" /> Newest First</>
            ) : (
              <><SortAsc className="w-5 h-5" /> Oldest First</>
            )}
          </button>
        </div>

        {searchTerm && (
          <div className="mt-3 text-sm text-[#6B6B6B]">
            Showing {filteredSubscribers.length} of {subscribers.length} subscribers
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-lg">
          <p className="text-sm text-[#D4534F]">{error}</p>
        </div>
      )}

      {filteredSubscribers.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow border border-[#E8DCC4]">
          <p className="text-[#6B6B6B]">
            {subscribers.length === 0 ? 'No newsletter subscribers yet.' : 'No subscribers found for your search.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white rounded-lg hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300 shadow-md"
            >
              Clear Search
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
                    Email Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Subscribed At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B6B6B] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DCC4]">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber._id} className="hover:bg-[#FAF8F3] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-[#9B9B9B]" />
                        <span className="text-sm font-medium text-[#4A4A4A]">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-[#6B6B6B]">
                        <Calendar className="w-4 h-4" />
                        {formatDate(subscriber.subscribedAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        disabled={deleteLoading === subscriber._id}
                        className="flex items-center gap-2 px-3 py-2 bg-[#FFF5F5] text-[#D4534F] rounded-lg hover:bg-[#FFE5E5] transition-colors disabled:opacity-50"
                      >
                        {deleteLoading === subscriber._id ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredSubscribers.length > 0 && (
        <div className="mt-4 text-sm text-[#6B6B6B]">
          Showing {filteredSubscribers.length} {filteredSubscribers.length !== subscribers.length && `of ${subscribers.length}`} subscribers
        </div>
      )}
    </div>
  );
};

export default NewsletterList;
