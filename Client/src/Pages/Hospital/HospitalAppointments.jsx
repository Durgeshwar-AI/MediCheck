import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

const initialAppointments = [
  { id: 'A-001', name: 'Ishita Kapoor', age: 31, time: '10:00 AM', status: 'pending', date: '2025-04-15' },
  { id: 'A-002', name: 'Raj Malhotra', age: 47, time: '11:30 AM', status: 'pending', date: '2025-04-15' },
  { id: 'A-003', name: 'Neha Sharma', age: 29, time: '01:00 PM', status: 'confirmed', date: '2025-04-15' },
  { id: 'A-004', name: 'Arjun Verma', age: 35, time: '03:00 PM', status: 'confirmed', date: '2025-04-14' }
];

const HospitalAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppointments(initialAppointments);
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = (id) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'confirmed' } : app)
    );
  };

  const handleReject = (id) => {
    setAppointments(prev =>
      prev.map(app => app.id === id ? { ...app, status: 'rejected' } : app)
    );
  };

  const today = new Date().toISOString().split('T')[0];
  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const todaysAppointments = appointments.filter(app => app.status === 'confirmed' && app.date === today);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />

      <div className="flex flex-grow">
        <HospitalSidebar />

        <main className="flex-grow p-6 overflow-auto">
          {isLoaded ? (
            <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
              
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <HospitalStatsCard title="Pending Appointments" value={pendingAppointments.length} icon="📩" bgColor="bg-yellow-100" />
                <HospitalStatsCard title="Today's Appointments" value={todaysAppointments.length} icon="📅" bgColor="bg-blue-100" />
                <HospitalStatsCard title="Total Confirmed" value={appointments.filter(a => a.status === 'confirmed').length} icon="✅" bgColor="bg-green-100" />
              </motion.div>

              {/* Pending Appointments */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-4">Pending Appointment Requests</h2>
                {pendingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingAppointments.map(app => (
                      <motion.div
                        key={app.id}
                        className="bg-white p-4 shadow-md rounded-xl border-l-4 border-yellow-500"
                        variants={itemVariants}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold">{app.name} ({app.age} yrs)</h3>
                            <p className="text-sm text-gray-600">Requested Time: {app.time}</p>
                            <p className="text-sm text-gray-600">Requested Date: {app.date}</p>
                            <p className="text-sm font-semibold mt-1 text-yellow-700 capitalize">Status: {app.status}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleAccept(app.id)}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleReject(app.id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No pending appointment requests.</p>
                )}
              </motion.div>

              {/* Today's Appointments */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mt-6 mb-4">Today's Appointments</h2>
                {todaysAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todaysAppointments.map(app => (
                      <motion.div
                        key={app.id}
                        className="bg-white p-4 shadow-md rounded-xl border-l-4 border-blue-500"
                        variants={itemVariants}
                      >
                        <div>
                          <h3 className="text-lg font-bold">{app.name} ({app.age} yrs)</h3>
                          <p className="text-sm text-gray-600">Appointment Time: {app.time}</p>
                          <p className="text-sm font-semibold mt-1 text-blue-700 capitalize">Status: {app.status}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No appointments scheduled for today.</p>
                )}
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

export default HospitalAppointments;
