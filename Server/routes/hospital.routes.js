import express from "express";
import { body } from "express-validator";
import { addDoctor, deleteDoc, getDoctors, getHospitals, loginHospital } from "../controllers/hospital.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginHospital
);

router.get("/",getHospitals)

router.post("/doctor",authMiddleware,addDoctor)
router.get("/doctors",authMiddleware,getDoctors)
router.delete("/doctor/:id",authMiddleware,deleteDoc)

export default router;
