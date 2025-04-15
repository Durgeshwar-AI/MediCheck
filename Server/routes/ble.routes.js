import express from 'express';
import healthData from '../controllers/ble.controller.js';

const router = express.Router();
router.post('/data', healthData);
router.post('/report', )

export default router;
