import { Team } from "../models/admin.model.js";
import Hospital from "../models/hospital.model.js"
import { getNextHospitalId } from "../services/counter.service.js";
import bcrypt from "bcrypt"

export const createMember = async (req, res) => {
  try {
    const { name, image, role, bio, eduction, expertise, publication } =
      req.body;

    // Validate required fields manually if needed
    if (!name || !image || !role || !bio || !eduction) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newTeamMember = new Team({
      name,
      image,
      role,
      bio,
      eduction,
      expertise,
      publication,
    });

    const savedMember = await newTeamMember.save();

    res.status(201).json({
      message: "Team member added successfully",
      teamMember: savedMember,
    });
  } catch (error) {
    console.error("Error saving team member:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = Team.find();
    res.json(team);
  } catch (err) {
    console.log(err);
  }
};

export const createHospital = async (req, res) => {
  try {
    const { company, email, contact, password } = req.body;

    // Validate required fields
    if ( !company || !email || !contact || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or contact already exists
    const existing = await Hospital.findOne({
      $or: [{ email }, { contact }],
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Email or contact already exists" });
    }

    const newId = await getNextHospitalId(); 

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospital = new Hospital({
      id: newId,
      company,
      email,
      contact,
      password: hashedPassword,
    });

    const savedHospital = await newHospital.save();

    const token = savedHospital.generateAuthToken();

    res.status(201).json({
      message: "Hospital registered successfully",
      hospital: {
        id: savedHospital.id,
        company: savedHospital.company,
        email: savedHospital.email,
        contact: savedHospital.contact,
      },
      token
    });
  } catch (error) {
    console.error("Error in /hospital:", error);
    res.status(500).json({ message: "Server error" });
  }
};
