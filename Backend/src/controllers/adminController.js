import Project from '../models/Project.js';
import Client from '../models/Client.js';
import ContactForm from '../models/ContactForm.js';
import Newsletter from '../models/Newsletter.js';
import { uploadToCloudinary, deleteFromCloudinary, getPublicIdFromUrl } from '../utils/upload.js';

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = req.body.image;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'flipiri/projects');
      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
          error: uploadResult.error
        });
      }
      imageUrl = uploadResult.url;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    const project = await Project.create({ image: imageUrl, name, description });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating project',
      error: error.message
    });
  }
};

export const getAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    console.error('Get admin projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message
    });
  }
};

export const getAdminProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Get admin project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    let imageUrl = req.body.image;

    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (req.file) {
      if (existingProject.image) {
        const publicId = getPublicIdFromUrl(existingProject.image);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer, 'flipiri/projects');
      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
          error: uploadResult.error
        });
      }
      imageUrl = uploadResult.url;
    }

    const updateData = {
      updatedAt: Date.now()
    };
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (imageUrl) updateData.image = imageUrl;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating project',
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.image) {
      const publicId = getPublicIdFromUrl(project.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    let imageUrl = req.body.image;

    if (!name || !description || !designation) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'flipiri/clients');
      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
          error: uploadResult.error
        });
      }
      imageUrl = uploadResult.url;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image'
      });
    }

    const client = await Client.create({ image: imageUrl, name, description, designation });

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating client',
      error: error.message
    });
  }
};

export const getAdminClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    console.error('Get admin clients error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching clients',
      error: error.message
    });
  }
};

export const getAdminClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.status(200).json({
      success: true,
      client
    });
  } catch (error) {
    console.error('Get admin client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching client',
      error: error.message
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    let imageUrl = req.body.image;

    const existingClient = await Client.findById(req.params.id);
    if (!existingClient) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    if (req.file) {
      if (existingClient.image) {
        const publicId = getPublicIdFromUrl(existingClient.image);
        if (publicId) {
          await deleteFromCloudinary(publicId);
        }
      }

      const uploadResult = await uploadToCloudinary(req.file.buffer, 'flipiri/clients');
      if (!uploadResult.success) {
        return res.status(500).json({
          success: false,
          message: 'Error uploading image',
          error: uploadResult.error
        });
      }
      imageUrl = uploadResult.url;
    }

    const updateData = {
      updatedAt: Date.now()
    };
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (designation) updateData.designation = designation;
    if (imageUrl) updateData.image = imageUrl;

    const client = await Client.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      client
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating client',
      error: error.message
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    if (client.image) {
      const publicId = getPublicIdFromUrl(client.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    await Client.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting client',
      error: error.message
    });
  }
};

export const getAllContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactForm.find().sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submissions',
      error: error.message
    });
  }
};

export const getContactSubmission = async (req, res) => {
  try {
    const submission = await ContactForm.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      submission
    });
  } catch (error) {
    console.error('Get contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submission',
      error: error.message
    });
  }
};

export const deleteContactSubmission = async (req, res) => {
  try {
    const submission = await ContactForm.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting contact submission',
      error: error.message
    });
  }
};

export const getAllNewsletterSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers
    });
  } catch (error) {
    console.error('Get newsletter subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching newsletter subscribers',
      error: error.message
    });
  }
};

export const deleteNewsletterSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully'
    });
  } catch (error) {
    console.error('Delete newsletter subscriber error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting subscriber',
      error: error.message
    });
  }
};
