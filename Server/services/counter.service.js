import { Counter } from "../models/counter.model.js"

export async function getNextHospitalId() {
  const result = await Counter.findOneAndUpdate(
    { id: "hospital" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `H-${result.seq}`;
}
