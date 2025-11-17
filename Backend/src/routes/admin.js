import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import { uploadSingle, handleMulterError } from '../middleware/upload.js';
import { adminLogin } from '../controllers/authController.js';
import {
  createProject,
  getAdminProjects,
  getAdminProject,
  updateProject,
  deleteProject,
  createClient,
  getAdminClients,
  getAdminClient,
  updateClient,
  deleteClient,
  getAllContactSubmissions,
  getContactSubmission,
  deleteContactSubmission,
  getAllNewsletterSubscribers,
  deleteNewsletterSubscriber
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);

router.use(authenticate);
router.use(authorizeAdmin);

router.post('/projects', uploadSingle, handleMulterError, createProject);
router.get('/projects', getAdminProjects);
router.get('/projects/:id', getAdminProject);
router.put('/projects/:id', uploadSingle, handleMulterError, updateProject);
router.delete('/projects/:id', deleteProject);

router.post('/clients', uploadSingle, handleMulterError, createClient);
router.get('/clients', getAdminClients);
router.get('/clients/:id', getAdminClient);
router.put('/clients/:id', uploadSingle, handleMulterError, updateClient);
router.delete('/clients/:id', deleteClient);

router.get('/contact', getAllContactSubmissions);
router.get('/contact/:id', getContactSubmission);
router.delete('/contact/:id', deleteContactSubmission);

router.get('/newsletters', getAllNewsletterSubscribers);
router.delete('/newsletters/:id', deleteNewsletterSubscriber);

export default router;
