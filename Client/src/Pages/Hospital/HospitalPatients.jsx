import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Pencil } from 'lucide-react';

import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

const HospitalPatients = () => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${URL}/patient`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleEdit = (patientId) => {
    const patient = patients.find((p) => p._id === patientId);
    setSelectedPatient({ ...patient });
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `${URL}/patient/${selectedPatient._id}`,
        {
          department: selectedPatient.department,
          status: selectedPatient.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPatients();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />
      <div className="flex flex-grow">
        <HospitalSidebar />
        <main className="flex-grow p-6 overflow-auto">
          {isLoaded ? (
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HospitalStatsCard
                  title="Total Patients"
                  value={patients.length}
                  icon="🧍‍♂️"
                  bgColor="bg-blue-100"
                />
                <HospitalStatsCard
                  title="Critical Patients"
                  value={patients.filter((p) => p.status.toLowerCase() === 'critical').length}
                  icon="🚨"
                  bgColor="bg-red-100"
                />
                <HospitalStatsCard
                  title="Stable Patients"
                  value={patients.filter((p) => p.status.toLowerCase() === 'stable').length}
                  icon="💊"
                  bgColor="bg-green-100"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <motion.div
                      key={patient._id}
                      className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500"
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold">{patient.firstName} {patient.lastName} ({patient.age} yrs)</h3>
                          <p className="text-sm text-gray-600">Department: {patient.department}</p>
                          <p className={`text-sm font-medium mt-1 ${
                            patient.status.toLowerCase() === 'critical' ? 'text-red-600' :
                            patient.status.toLowerCase() === 'stable' ? 'text-green-600' :
                            patient.status.toLowerCase() === 'recovering' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            Status: {patient.status}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-gray-400 text-sm">{patient.patientId}</span>
                          <button onClick={() => handleEdit(patient._id)} className="text-blue-600 mt-2">
                            <Pencil size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </main>
      </div>
      <BackToTopButton />

      {isModalOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Patient</h3>

            <label className="block text-sm font-medium mb-1">Department</label>
            <input
              value={selectedPatient.department}
              onChange={(e) => setSelectedPatient({ ...selectedPatient, department: e.target.value })}
              className="w-full mb-3 p-2 border border-gray-300 rounded-md"
            />

            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={selectedPatient.status}
              onChange={(e) => setSelectedPatient({ ...selectedPatient, status: e.target.value })}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Critical">Critical</option>
              <option value="Stable">Stable</option>
              <option value="Recovering">Recovering</option>
              <option value="Under Observation">Under Observation</option>
              <option value="Discharged">Discharged</option>
            </select>

            <div className="flex justify-end gap-2">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalPatients;
