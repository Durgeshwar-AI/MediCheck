import express from 'express';
import healthData, { report } from '../controllers/ble.controller.js';

const router = express.Router();
router.post('/data', healthData);
router.post('/report', report )

export default router;
