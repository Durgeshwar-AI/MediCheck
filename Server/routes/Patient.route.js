import express from 'express';
import {
  addPatient,
  editPatient,
  getAllPatients,
} from '../controllers/patient.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/',authMiddleware, addPatient);            
router.get('/',authMiddleware, getAllPatients);          
router.put('/:id', authMiddleware, editPatient);    
export default router;
