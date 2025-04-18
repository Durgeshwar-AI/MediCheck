import User, { File } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import hospital from "../models/hospital.model.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, phone, password } = req.body;
  const { firstname, lastname } = fullname || {};

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      fullname: { firstname, lastname },
      email,
      phone,
      password,
    });

    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ token, firstname });
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
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateAuthToken();
    const firstname = user.fullname.firstname;
    res.status(200).json({ token, firstname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fileUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const image = new File({
      name: file.originalname,
      data: file.buffer.toString('base64'),
      contentType: file.mimetype,
      userId: req.user.id,
    });

    await image.save();
    res.status(201).json(image);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export const fileRetrive = async (req, res) => {
  try {
    const images = await File.find({ userId: req.user.id });
    res.json(images);
  } catch (err) {
    console.error('Retrieval error:', err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};

export const fileDelete = async (req, res) => {
  try {
    const file = await File.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.json({ message: 'File deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
};

export const getHospitals = async (req, res) => {
  const hospitals = await hospital.find({}, "id company");
  res.json(hospitals);
};

export const appointments = async (req, res) => {
  const { name, date, time, doctor, hospitalId } = req.body;
  const place = await hospital.find({id:hospitalId},"_id")
};
