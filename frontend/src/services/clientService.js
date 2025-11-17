import axiosInstance from '../config/axios';

const clientService = {
  getAll: async () => {
    const response = await axiosInstance.get('/clients');
    return response;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/clients/${id}`);
    return response;
  }
};

export default clientService;
