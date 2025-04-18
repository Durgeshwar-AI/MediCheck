import Patient from '../models/Patient.model.js';

let patientCounter = 1000; 
export const addPatient = async (req, res) => {
  try {
    const formData = req.body;

    patientCounter++;
    const newPatient = new Patient({
      ...formData,
      patientId: `P-${patientCounter}`,
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add patient' });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await Patient.findByIdAndDelete(id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};
