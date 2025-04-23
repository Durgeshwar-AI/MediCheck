import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  doctorType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  amount: {
    type: Number,
  },
});

const Appointment = new mongoose.model("appointment", appointmentSchema);
export default Appointment;
