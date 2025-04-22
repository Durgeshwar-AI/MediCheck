import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { createAppointment } from "../controllers/appointments.controller.js"
 
const router = express.Router()

router.post("/create",authMiddleware,createAppointment)

export default router