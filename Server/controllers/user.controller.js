import userService from "../services/user.service";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  const { fullname, email, phone, password } = req.body;

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    phone,
    password: password,
  });

  const token = user.generateAuthToken();

  res.status(201).json({ token, user });
};
