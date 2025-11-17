import express from 'express';
import { getAllClients, getClient } from '../controllers/clientController.js';

const router = express.Router();

router.get('/', getAllClients);
router.get('/:id', getClient);

export default router;
