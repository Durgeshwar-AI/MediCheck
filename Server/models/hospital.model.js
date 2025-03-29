import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const hospitalSchema = new mongoose.Schema({
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

hospitalSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
}
const hospital=mongoose.model("Hospital",hospitalSchema)
export default hospital