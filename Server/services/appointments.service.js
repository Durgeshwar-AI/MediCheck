import hospital from "../models/hospital.model.js";

export const GetHospitalId = async (data) => {
  const id = data.split("/")[0];
  console.log( await hospital.findOne({id}))
  const hospitalId = await hospital.findOne({ id })
  return hospitalId._id;
};
