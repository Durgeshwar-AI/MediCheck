import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { addMedication, deleteMedication, getMedication } from "../controllers/medication.controller.js";

const Router=express.Router()

Router.post('/',authMiddleware,addMedication)

Router.get('/',authMiddleware,getMedication)

Router.delete('/:id',authMiddleware,deleteMedication)

export default Router