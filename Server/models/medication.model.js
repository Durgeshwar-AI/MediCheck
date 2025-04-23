import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const medication = mongoose.model("Medicine", medicationSchema);

export default medication;
