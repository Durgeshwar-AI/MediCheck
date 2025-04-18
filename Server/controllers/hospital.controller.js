import { validationResult } from "express-validator"
import Hospital from "../models/hospital.model.js";
import bcrypt from "bcrypt"

export const loginHospital= async(req,res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email }).select("+password");
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!hospital) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - User not found" });
    }

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials - Password mismatch" });
    }

    const token = hospital.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
}