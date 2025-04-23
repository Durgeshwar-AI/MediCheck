import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const hospitalSchema = new mongoose.Schema({
  id: { type : String, required: true},
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

hospitalSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const doctorSchema = new mongoose.Schema({
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
});

const hospital = mongoose.model("Hospital", hospitalSchema);
const doctor = mongoose.model("Doctor", doctorSchema);

export default hospital;
export { doctor };
