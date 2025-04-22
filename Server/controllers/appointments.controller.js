import Appointment from "../models/appointments.model.js";
import { GetHospitalId } from "../services/appointments.service.js";

export const createAppointment = async (req, res) => {
  try {
    const { name, age, hospitalName, date, month, time, doctorType } = req.body;
    const userId = req.user.id;
    const hospitalId = await GetHospitalId(hospitalName);

    const appointmentData = {
      userId,
      name,
      age,
      month,
      date,
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

