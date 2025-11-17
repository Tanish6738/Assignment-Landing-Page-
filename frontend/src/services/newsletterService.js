import axiosInstance from '../config/axios';

const newsletterService = {
  subscribe: async (data) => {
    const response = await axiosInstance.post('/newsletter/subscribe', data);
    return response;
  }
};

export default newsletterService;
