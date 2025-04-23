import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

const initialEmergencyCases = [
  { id: 'E-001', name: 'Sanya Malhotra', age: 27, condition: 'Accident Trauma', eta: '5 mins', status: 'incoming' },
  { id: 'E-002', name: 'Rahul Nair', age: 45, condition: 'Cardiac Arrest', eta: '2 mins', status: 'incoming' },
  { id: 'E-003', name: 'Simran Kaur', age: 33, condition: 'Severe Allergic Reaction', eta: 'Arrived', status: 'arrived' }
];

const HospitalEmergency = () => {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmergencyCases(initialEmergencyCases);
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (caseId) => {
    setEmergencyCases(prev =>
      prev.map(c => c.id === caseId ? { ...c, status: 'accepted' } : c)
    );
  };

  const handleReject = (caseId) => {
    setEmergencyCases(prev =>
      prev.map(c => c.id === caseId ? { ...c, status: 'rejected' } : c)
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HospitalStatsCard title="Emergency Cases" value={emergencyCases.length} icon="🚑" bgColor="bg-red-100" />
                <HospitalStatsCard title="On-Duty Staff" value={5} icon="👨‍⚕️" bgColor="bg-blue-100" />
                <HospitalStatsCard title="Emergency Beds Available" value={4} icon="🛏️" bgColor="bg-green-100" />
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-4">Incoming Emergency Requests</h2>
                <div className="space-y-4">
                  {emergencyCases.map((ecase) => (
                    <motion.div
                      key={ecase.id}
                      className={`p-4 rounded-xl shadow-md bg-white border-l-4 ${
                        ecase.status === 'accepted'
                          ? 'border-green-500'
                          : ecase.status === 'rejected'
                          ? 'border-red-500'
                          : 'border-yellow-500'
                      }`}
                      variants={itemVariants}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold">{ecase.name} ({ecase.age} yrs)</h3>
                          <p className="text-sm text-gray-600">Condition: {ecase.condition}</p>
                          <p className="text-sm text-gray-600">ETA: {ecase.eta}</p>
                          <p className="text-sm text-gray-700 mt-1">
                            Status: <span className="font-semibold capitalize">{ecase.status}</span>
                          </p>
                        </div>
                        {ecase.status === 'incoming' && (
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleAccept(ecase.id)}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleReject(ecase.id)}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </main>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default HospitalEmergency;
