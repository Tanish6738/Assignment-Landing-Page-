import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services';
import { Upload, Loader, ArrowLeft } from 'lucide-react';

const ProjectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    currentImage: ''
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await adminService.projects.getById(id);
      const project = response.project;
      setFormData({
        name: project.name,
        description: project.description,
        image: null,
        currentImage: project.image
      });
      setImagePreview(project.image);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.description) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();
      if (formData.image) {
        data.append('image', formData.image);
      }
      data.append('name', formData.name);
      data.append('description', formData.description);

      await adminService.projects.update(id, data);
      navigate('/admin/projects');
    } catch (err) {
      setError(err.message || 'Failed to update project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-[#C4A962]" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 pb-4 border-b-2 border-[#E8DCC4]">
        <button
          onClick={() => navigate('/admin/projects')}
          className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#C4A962] mb-4 transition-all duration-200 hover:-translate-x-1 font-medium"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Back to Projects</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Edit Project</h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-lg">
          <p className="text-sm text-[#D4534F]">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-lg p-4 md:p-6 space-y-6 border-2 border-[#E8DCC4] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37]"></div>
        <div>
          <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Project Image
          </label>
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-[#F5EFE0] text-[#C4A962] rounded-lg cursor-pointer hover:bg-[#E8DCC4] transition-colors text-sm md:text-base">
              <Upload className="w-4 h-4 md:w-5 md:h-5" />
              Change Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {formData.image && (
              <span className="text-sm text-[#6B6B6B]">{formData.image.name}</span>
            )}
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg border border-[#E8DCC4]"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4A4A4A] mb-2">
            Project Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            placeholder="Enter project name"
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
            rows="6"
            className="w-full px-4 py-2 border border-[#E8DCC4] rounded-lg focus:ring-2 focus:ring-[#C4A962] focus:border-transparent bg-[#FAF8F3]"
            placeholder="Enter project description"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white rounded-lg hover:from-[#D4AF37] hover:to-[#C4A962] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl hover:-translate-y-0.5 font-medium"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                <span className="text-sm md:text-base">Updating...</span>
              </>
            ) : (
              <span className="text-sm md:text-base">Update Project</span>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="px-6 py-3 bg-[#F5EFE0] text-[#4A4A4A] rounded-lg hover:bg-[#E8DCC4] transition-all duration-200 hover:shadow-md font-medium text-sm md:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEdit;
