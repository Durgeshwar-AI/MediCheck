import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { createAppointment, getAppointments } from "../controllers/appointments.controller.js"
 
const router = express.Router()

router.post("/create",authMiddleware,createAppointment)

router.get("/",authMiddleware,getAppointments)

export default router