import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../services';
import { Trash2, Edit, Plus, Loader } from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await adminService.projects.getAll();
      setProjects(response.projects || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await adminService.projects.delete(id);
      setProjects(projects.filter(project => project._id !== id));
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to delete project');
    } finally {
      setDeleteLoading(null);
    }
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b-2 border-[#E8DCC4]">
        <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-[#C4A962] to-[#D4AF37] bg-clip-text text-transparent uppercase tracking-tight">Manage Projects</h1>
        <button
          onClick={() => navigate('/admin/projects/create')}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-[#C4A962] to-[#D4AF37] text-white hover:from-[#D4AF37] hover:to-[#C4A962] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg text-sm md:text-base font-bold border-b-4 border-[#D4AF37] hover:border-[#C4A962]"
        >
          <Plus className="w-5 h-5" />
          <span className="whitespace-nowrap">Add Project</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-[#FFF5F5] border border-[#FFC5C5] rounded-lg">
          <p className="text-sm text-[#D4534F]">{error}</p>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white shadow-lg border-2 border-[#E8DCC4]">
          <p className="text-[#6B6B6B] font-medium">No projects found. Create your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="group bg-white shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-[#E8DCC4] hover:border-[#C4A962] relative"
            >
              <div className="absolute top-0 right-0 w-0 h-1 bg-linear-to-r from-[#C4A962] to-[#D4AF37] group-hover:w-full transition-all duration-500"></div>
              <div className="h-48 bg-[#F5EFE0] relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#4A4A4A] mb-2">
                  {project.name}
                </h3>
                <p className="text-sm text-[#6B6B6B] line-clamp-3 mb-4">
                  {project.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#F5EFE0] text-[#C4A962] hover:bg-[#E8DCC4] transition-all duration-200 border-b-2 border-[#C4A962] hover:shadow-md font-medium"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    disabled={deleteLoading === project._id}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#FFF5F5] text-[#D4534F] hover:bg-[#FFE5E5] transition-all duration-200 disabled:opacity-50 border-b-2 border-[#D4534F] hover:shadow-md font-medium"
                  >
                    {deleteLoading === project._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
