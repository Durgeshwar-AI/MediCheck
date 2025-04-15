import React, { createContext, useState, useContext } from 'react';

// Create a context to hold health data
const HealthDataContext = createContext();

// Create a provider component
export const HealthDataProvider = ({ children }) => {
  const [heartRate, setHeartRate] = useState('N/A');
  const [oxygen, setOxygen] = useState('N/A');
  const [bp, setBP] = useState('N/A');
  const [steps, setSteps] = useState('N/A');
  const [sleep, setSleep] = useState('N/A');

  // Function to update health data
  const updateHealthData = (data) => {
    setHeartRate(data.heartRate || heartRate);
    setOxygen(data.oxygen || oxygen);
    setBP(data.bp || bp);
    setSteps(data.steps || steps);
    setSleep(data.sleep || sleep);
  };

  return (
    <HealthDataContext.Provider value={{ heartRate, oxygen, bp, steps, sleep, updateHealthData }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  return useContext(HealthDataContext);
};
