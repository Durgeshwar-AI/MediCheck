import express from 'express';
import {
  addPatient,
  getAllPatients,
  deletePatient
} from '../controllers/patient.controller.js';

const router = express.Router();

router.post('/', addPatient);            
router.get('/', getAllPatients);          
router.delete('/:id', deletePatient);    
export default router;
