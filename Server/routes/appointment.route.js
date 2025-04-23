import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import { acceptAppointment, createAppointment, getAppointments, hospitalGetAppointments, rejectAppointment } from "../controllers/appointments.controller.js"
 
const router = express.Router()

router.post("/create",authMiddleware,createAppointment)

router.get("/",authMiddleware,getAppointments)

router.get("/hospital",authMiddleware,hospitalGetAppointments)

router.put("/:id/accept",acceptAppointment)

router.put("/:id/reject",rejectAppointment)

export default router