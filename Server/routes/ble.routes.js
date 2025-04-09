import express from 'express';
import { getHealthData } from '../controllers/ble.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/data', authMiddleware, getHealthData);

export default router;
