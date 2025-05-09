import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, fileUpload, fileRetrive, getHospitals, fileDelete } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.config.js";

const router = express.Router();

// Register Route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First Name should be at least 3 characters long"),
    body("fullname.lastname")
      .optional()
      .isLength({ min: 1 })
      .withMessage("Last Name should not be empty if provided"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("phone")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number should be exactly 10 characters long"),
  ],
  registerUser
);

// Login Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

router.post("/files", authMiddleware, upload.single('file'), fileUpload);

router.get("/files", authMiddleware, fileRetrive)

router.delete("/files/:id", authMiddleware, fileDelete)

router.get("/hospitals", getHospitals)

export default router;
