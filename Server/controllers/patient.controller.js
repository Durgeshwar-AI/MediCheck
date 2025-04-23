import Patient from '../models/Patient.model.js';

let patientCounter = 1000; 
export const addPatient = async (req, res) => {
  try {
    const formData = req.body;
    const hospitalId = req.user.id

    patientCounter++;
    const newPatient = new Patient({
      ...formData,
      patientId: `P-${patientCounter}`,
      hospitalId
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

export const getAllPatients = async (req, res) => {
  const hospitalId = req.user.id
  try {
    const patients = await Patient.find({hospitalId}).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
};

export const editPatient = async (req, res) => {
  const { id } = req.params;
  const { department, status } = req.body;
  try {
    const updated = await Patient.findByIdAndUpdate(id, { department, status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};
