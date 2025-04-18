import mongoose from "mongoose";

const goalsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  target: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  percent: {
    type: Number,
    required: true,
  },
});

const goal = mongoose.model("Goal", goalsSchema);

export default goal;
