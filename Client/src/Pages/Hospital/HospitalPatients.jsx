import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

const initialPatients = [
  { id: 'P-1001', name: 'Aarav Mehta', age: 45, doctor: 'Dr. Verma', status: 'Critical' },
  { id: 'P-1002', name: 'Ishita Kapoor', age: 29, doctor: 'Dr. Sharma', status: 'Stable' },
  { id: 'P-1003', name: 'Ravi Kumar', age: 37, doctor: 'Dr. Reddy', status: 'Recovering' },
  { id: 'P-1004', name: 'Anjali Gupta', age: 52, doctor: 'Dr. Patel', status: 'Under Observation' },
  { id: 'P-1005', name: 'Vikram Singh', age: 61, doctor: 'Dr. Rao', status: 'Active' },
  { id: 'P-1006', name: 'Neha Sharma', age: 31, doctor: 'Dr. Banerjee', status: 'Stable' },
  { id: 'P-1007', name: 'Arjun Das', age: 50, doctor: 'Dr. Iyer', status: 'Recovering' },
];

const HospitalPatients = () => {
  const [patients, setPatients] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPatients(initialPatients);
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />

      <div className="flex flex-grow">
        <HospitalSidebar />

        <main className="flex-grow p-6 overflow-auto">
          {isLoaded ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <HospitalStatsCard
                  title="Total Patients"
                  value={patients.length}
                  icon="🧍‍♂️"
                  bgColor="bg-blue-100"
                />
                <HospitalStatsCard
                  title="Critical Patients"
                  value={patients.filter(p => p.status.toLowerCase() === 'critical').length}
                  icon="🚨"
                  bgColor="bg-red-100"
                />
                <HospitalStatsCard
                  title="Stable Patients"
                  value={patients.filter(p => p.status.toLowerCase() === 'stable').length}
                  icon="💊"
                  bgColor="bg-green-100"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-semibold mb-4">All Patients</h2>
                <div className="space-y-4">
                  {patients.map(patient => (
                    <motion.div
                      key={patient.id}
                      className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500"
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold">{patient.name} ({patient.age} yrs)</h3>
                          <p className="text-sm text-gray-600">Doctor: {patient.doctor}</p>
                          <p className={`text-sm font-medium mt-1 ${
                            patient.status === 'Critical' ? 'text-red-600' :
                            patient.status === 'Stable' ? 'text-green-600' :
                            patient.status === 'Recovering' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`}>
                            Status: {patient.status}
                          </p>
                        </div>
                        <span className="text-gray-400 text-sm">{patient.id}</span>
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
    </div>
  );
};

export default HospitalPatients;
