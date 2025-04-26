import express from 'express';
import healthData, { report, symptomsChecker } from '../controllers/ble.controller.js';

const router = express.Router();
router.post('/data', healthData);
router.post('/report', report )
router.post('/symptoms', symptomsChecker)

export default router;
