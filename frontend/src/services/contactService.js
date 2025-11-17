import axiosInstance from '../config/axios';

const contactService = {
  submit: async (formData) => {
    const response = await axiosInstance.post('/contact', formData);
    return response;
  }
};

export default contactService;
