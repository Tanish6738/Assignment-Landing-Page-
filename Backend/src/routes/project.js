import express from 'express';
import { getAllProjects, getProject } from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);

export default router;
