import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    admissionReason: { type: String, required: true },
    medicalHistory: { type: String },
    allergies: { type: String },
    ongoingMedications: { type: String },
    additionalRemarks: { type: String },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    insuranceNumber: { type: String },
    emergencyContact: { type: String },
    emergencyPhone: { type: String },
    patientId: { type: String, unique: true, required: true },
    department: { type: String, required: true },
    status: { type: String, required: true, defualt: "Stable" },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
