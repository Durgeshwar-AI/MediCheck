import React, { useContext, useEffect, useState } from 'react';
import { HealthContext } from '../hooks/useHealth';


// Create a provider component
export const HealthProvider = ({ children }) => {

  const tokenData = localStorage.getItem("authToken");
  
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.log("reload")
  }else{
    if(tokenData && JSON.parse(tokenData).type == "hospital") localStorage.removeItem("authToken")
  }

  const [heartRate, setHeartRate] = useState('N/A');
  const [oxygen, setOxygen] = useState('N/A');
  const [bp, setBP] = useState('N/A');
  const [steps, setSteps] = useState('N/A');
  const [sleep, setSleep] = useState('N/A');
  const [device, setDevice] = useState('N/A');
  const [userLoggedIn, setUserLoggedIn] = useState(tokenData?true:false);
  const [deviceConnected, setDeviceConnected] = useState(false)
  const [health, setHealth] = useState(null)
  const [type,setType]= useState(tokenData?JSON.parse(tokenData).type:null)

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
  
  const updateType = (data) => {
    setType(data)
  }

  useEffect(()=>{
    if(!deviceConnected){
      setHeartRate('N/A');
    setOxygen('N/A');
    setBP('N/A');
    setSteps('N/A');
    setSleep('N/A');
    }
  },[deviceConnected])

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
        updateDevice,
        type,
        updateType
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};
