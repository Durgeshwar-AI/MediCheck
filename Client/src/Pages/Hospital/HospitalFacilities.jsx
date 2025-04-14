import React, { useState } from 'react';
import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';
import { motion } from 'framer-motion';

const initialFacilities = {
  generalWard: { available: 18, occupied: 32 },
  icu: { available: 3, occupied: 7 },
  operatingRooms: { available: 2, inUse: 3 },
  liftsWorking: true,
  emergencySupport: true,
};

const HospitalFacilities = () => {
  const [facilities, setFacilities] = useState(initialFacilities);

  const toggleLiftStatus = () => {
    setFacilities(prev => ({
      ...prev,
      liftsWorking: !prev.liftsWorking
    }));
  };

  const toggleEmergencySupport = () => {
    setFacilities(prev => ({
      ...prev,
      emergencySupport: !prev.emergencySupport
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />
      <div className="flex flex-grow">
        <HospitalSidebar />
        <main className="flex-grow p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-800">Hospital Facilities Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FacilityCard title="General Ward" data={facilities.generalWard} />
              <FacilityCard title="ICU" data={facilities.icu} />
              <FacilityCard title="Operating Rooms" data={facilities.operatingRooms} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <StatusCard
                label="Lifts"
                status={facilities.liftsWorking}
                onToggle={toggleLiftStatus}
              />
              <StatusCard
                label="Emergency Support"
                status={facilities.emergencySupport}
                onToggle={toggleEmergencySupport}
              />
            </div>
          </motion.div>
        </main>
      </div>
      <BackToTopButton />
    </div>
  );
};

const FacilityCard = ({ title, data }) => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <h3 className="text-lg font-semibold text-blue-600">{title}</h3>
    <p>Available: {data.available}</p>
    <p>{data.occupied !== undefined ? `Occupied: ${data.occupied}` : `In Use: ${data.inUse}`}</p>
  </div>
);

const StatusCard = ({ label, status, onToggle }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
    <div>
      <h3 className="text-lg font-semibold text-green-600">{label} Status</h3>
      <p>{status ? 'Operational' : 'Not Working'}</p>
    </div>
    <button
      onClick={onToggle}
      className={`px-4 py-2 text-white rounded-lg ${status ? 'bg-red-500' : 'bg-green-500'}`}
    >
      {status ? 'Mark as Down' : 'Mark as Operational'}
    </button>
  </div>
);

export default HospitalFacilities;
