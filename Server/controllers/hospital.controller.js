import { validationResult } from "express-validator";
import Hospital, { doctor } from "../models/hospital.model.js";
import bcrypt from "bcrypt";

export const loginHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
    res
      .status(200)
      .json({ token, company: hospital.company, email, type: "hospital" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    const formatted = hospitals.map((hospital, index) => {
      return `${hospital.id}/${hospital.company}`;
    });

    res.status(200).json(formatted);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch hospitals", details: err.message });
  }
};

export const addDoctor = async (req, res) => {
  console.log("working");
  const hospital = req.user.id;
  try {
    const doc = new doctor({ ...req.body, hospital });
    await doc.save();
    res.status(200).json({ message: "Doctor added" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getDoctors = async (req, res) => {
  const hospital = req.user.id;
  try {
    const doctors = await doctor.find({ hospital });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteDoc = async (req, res) => {
  try {
    const doc = await doctor.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
};
