import Appointment from "../models/appointments.model.js";
import { GetHospitalId } from "../services/appointments.service.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, age, hospitalName, date, month, time, doctorType, year } = req.body;
    const userId = req.user.id;
    const hospitalId = await GetHospitalId(hospitalName);

    const appointmentData = {
      userId,
      name,
      age,
      month,
      date,
      year,
      time,
      hospitalId,
      hospitalName,
      doctorType,
    };
    const appointments = new Appointment(appointmentData);

    await appointments.save();
    res.status(200).json({ message: "Appointment created" });
  } catch (err) {
    console.log("Errors", err);
    res.status(500).json({ message: err.message });
  }
};

export const getAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const data = await Appointment.find({ userId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const hospitalGetAppointments = async (req, res) => {
  const hospitalId = req.user.id;
  try {
    const data = await Appointment.find({ hospitalId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const acceptAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    await Appointment.findOneAndUpdate(
      { _id: id },
      { amount: req.body.amount, status: "accepted" }
    );
    res.status(200).json({message:"OK"})
  } catch (err) {
    res.status(500).json({error:err})
  }
};

export const rejectAppointment = async (req,res)=>{
  const id = req.params.id;
  try {
    await Appointment.findOneAndUpdate(
      { _id: id },
      {status: "rejected" }
    );
    res.status(200).json({message:"OK"})
  } catch (err) {
    res.status(500).json({error:err})
  }
}
