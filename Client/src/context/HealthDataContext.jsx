import React, { useContext, useState } from 'react';
import { HealthContext } from '../hooks/useHealth';


// Create a provider component
export const HealthProvider = ({ children }) => {

  const tokenData = localStorage.getItem("authToken");

  const [heartRate, setHeartRate] = useState('N/A');
  const [oxygen, setOxygen] = useState('N/A');
  const [bp, setBP] = useState('N/A');
  const [steps, setSteps] = useState('N/A');
  const [sleep, setSleep] = useState('N/A');
  const [device, setDevice] = useState('N/A');
  const [userLoggedIn, setUserLoggedIn] = useState(tokenData?true:false);
  const [deviceConnected, setDeviceConnected] = useState(false)
  const [health, setHealth] = useState(null)

  // Function to update health data
  const updateHealthData = (data) => {
    setHeartRate(data.heartRate || heartRate);
    setOxygen(data.oxygen || oxygen);
    setBP(data.bp || bp);
    setSteps(data.steps || steps);
    setSleep(data.sleep || sleep);
  };

  const updateLogin = (data) => {
    setUserLoggedIn(data);
  };
  
  const updateConnection = (data) => {
    setDeviceConnected(data)
  }

  const updateHealth = (data) => {
    setHealth(data)
  }

  const updateDevice = (data) =>{
    setDevice(data)
  }

  return (
    <HealthContext.Provider
      value={{
        heartRate,
        oxygen,
        bp,
        steps,
        sleep,
        updateHealthData,
        userLoggedIn,
        updateLogin,
        deviceConnected,
        updateConnection,
        health,
        updateHealth,
        device,
        updateDevice
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};
