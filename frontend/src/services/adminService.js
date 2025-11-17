import axiosInstance from '../config/axios';

const adminService = {
  projects: {
    create: async (formData) => {
      const response = await axiosInstance.post('/admin/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },

    getAll: async () => {
      const response = await axiosInstance.get('/admin/projects');
      return response;
    },

    getById: async (id) => {
      const response = await axiosInstance.get(`/admin/projects/${id}`);
      return response;
    },

    update: async (id, formData) => {
      const response = await axiosInstance.put(`/admin/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },

    delete: async (id) => {
      const response = await axiosInstance.delete(`/admin/projects/${id}`);
      return response;
    }
  },

  clients: {
    create: async (formData) => {
      const response = await axiosInstance.post('/admin/clients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },

    getAll: async () => {
      const response = await axiosInstance.get('/admin/clients');
      return response;
    },

    getById: async (id) => {
      const response = await axiosInstance.get(`/admin/clients/${id}`);
      return response;
    },

    update: async (id, formData) => {
      const response = await axiosInstance.put(`/admin/clients/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },

    delete: async (id) => {
      const response = await axiosInstance.delete(`/admin/clients/${id}`);
      return response;
    }
  },

  contacts: {
    getAll: async () => {
      const response = await axiosInstance.get('/admin/contact');
      return response;
    },

    getById: async (id) => {
      const response = await axiosInstance.get(`/admin/contact/${id}`);
      return response;
    },

    delete: async (id) => {
      const response = await axiosInstance.delete(`/admin/contact/${id}`);
      return response;
    }
  },

  newsletters: {
    getAll: async () => {
      const response = await axiosInstance.get('/admin/newsletters');
      return response;
    },

    delete: async (id) => {
      const response = await axiosInstance.delete(`/admin/newsletters/${id}`);
      return response;
    }
  }
};

export default adminService;
