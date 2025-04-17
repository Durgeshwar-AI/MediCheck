import User, { File } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import hospital from '../models/hospital.model.js';

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
      return res.status(400).json({ message: 'User already exists' });
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
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    const firstname = user.fullname.firstname
    res.status(200).json({ token, firstname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fileUpload = async (req, res) => {
  const { name, data, contentType } = req.body;
  const image = new File({
    name,
    data,
    contentType,
    userId: req.user.userId,
  });
  await image.save();
  res.send({ message: "Image saved" });
}

export const fileRetrive = async (req, res) => {
  const images = await File.find({ userId: req.user.userId });
  res.json(images);
}

export const getHospitals = async (req,res)=>{
  const hospitals = await hospital.find({},"id company")
  res.json(hospitals)
}