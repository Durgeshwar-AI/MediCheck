// src/hooks/useSocketHealthData.js
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

const useSocketHealthData = () => {
  const [healthData, setHealthData] = useState(null);
  const [deviceStatus, setDeviceStatus] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);
    socketRef.current.on('healthData', (payload) => {
      console.log('Received health data:', payload);
      setHealthData(payload);
    });
    socketRef.current.on('deviceStatus', (payload) => {
      console.log('Device status:', payload);
      setDeviceStatus(payload);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { healthData, deviceStatus };
};

export default useSocketHealthData;
