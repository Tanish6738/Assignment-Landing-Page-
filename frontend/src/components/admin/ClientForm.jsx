import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services';
import { Loader, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import ImageCropper from '../ImageCropper';

const ClientForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: null
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

    if (!formData.name || !formData.designation || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    if (!formData.image) {
      setError('Please select an image');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('image', formData.image);
      data.append('name', formData.name);
      data.append('designation', formData.designation);
      data.append('description', formData.description);

      await adminService.clients.create(data);
      navigate('/admin/clients');
    } catch (err) {
      setError(err.message || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 pb-4 border-b-2 border-[#E8DCC4]">
        <button
          onClick={() => navigate('/admin/clients')}
          className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] mb-4 transition-all duration-200 hover:-translate-x-1 font-medium text-sm md:text-base"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          Back to Clients
        </button>
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Add New Client</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-lg">
          <p className="text-sm text-[#D4534F]">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 space-y-6 border-2 border-[#E8DCC4] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37]"></div>
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Client Image * (450 × 350 recommended)
          </label>
          {!imagePreview ? (
            <ImageCropper
              onCropComplete={(file, preview) => {
                setFormData(prev => ({
                  ...prev,
                  image: file
                }));
                setImagePreview(preview);
                setError('');
              }}
              aspectRatio={450 / 350}
            />
          ) : (
            <div className="space-y-3">
              <div className="relative rounded-xl overflow-hidden border-2 border-[#E8DCC4]">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImagePreview('');
                  setFormData(prev => ({ ...prev, image: null }));
                }}
                className="w-full px-4 py-2 bg-[#FFF5F5] text-[#D4534F] font-medium rounded-lg hover:bg-[#FFE5E5] transition-colors flex items-center justify-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                Change Image
              </button>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Client Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            placeholder="Enter client name"
          />
        </div>

        <div>
          <label htmlFor="designation" className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Designation *
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            placeholder="e.g., CEO, Technology Partner"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            placeholder="Enter client description/testimonial"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white hover:from-[#D4AF37] hover:to-[#C4A962] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm md:text-base font-bold border-b-4 border-[#D4AF37]"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Client'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/clients')}
            className="px-6 py-3 bg-[#F5EFE0] text-[#4A4A4A] hover:bg-[#E8DCC4] transition-all duration-200 hover:shadow-md text-sm md:text-base font-bold border-b-4 border-[#E8DCC4]"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
