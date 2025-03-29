import express from "express";
import { body } from "express-validator";
import { loginHospital } from "../controllers/hospital.controller.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginHospital
);

export default router;
