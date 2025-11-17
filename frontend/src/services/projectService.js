import axiosInstance from '../config/axios';

const projectService = {
  getAll: async () => {
    const response = await axiosInstance.get('/projects');
    return response;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response;
  }
};

export default projectService;
