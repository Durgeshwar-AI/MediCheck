import express from 'express';
import { getHealthData, handleDisconnect } from '../controllers/ble.controller.js'; 

const router = express.Router();
router.get('/data', getHealthData);
router.post('/disconnect/:address', handleDisconnect);

export default router;
