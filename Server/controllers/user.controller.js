import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
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

    res.status(201).json({ token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
