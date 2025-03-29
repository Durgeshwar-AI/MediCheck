import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import User from "../models/user.register.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, phone, password } = req.body;

  try {
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      phone,
      password,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - User not found" });
    }

    console.log("Stored Password:", user.password);
    console.log("Entered Password:", password);

    if (password !== user.password) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - Password mismatch" });
    }

    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

