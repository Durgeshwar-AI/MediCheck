import hospital from "../models/hospital.model.js";

export const GetHospitalId = async (data) => {
  const id = data.split("/")[0];
  const hospitalId = await hospital.findOne({ id })
  return hospitalId._id;
};
