import MenuTop from "../MenuTop";

function Metrics({ metrics, connected }) {
    // Icons mapping for different metrics
    const metricIcons = {
      "Heart Rate": <HeartRateIcon />,
      "Oxygen Level": <OxygenIcon />,
      "Blood Pressure": <BPIcon />,
      "Steps Today": <StepsIcon />,
      "Sleep Duration": <SleepIcon />,
    };
  
    return (
      <div className="bg-white border rounded-lg shadow-sm">
        <MenuTop data="Current Health Metrics" />
        {connected ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6">
            {metrics.map((metric) => (
              <MetricCard 
                key={metric.name}
                name={metric.name}
                value={metric.data}
                icon={metricIcons[metric.name]}
              />
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="bg-blue-50 p-6 rounded-lg inline-block">
              <div className="text-blue-400 mb-3">
                <span className="inline-block p-3 bg-blue-100 rounded-full">
                  ⌚
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                Connect your smartwatch to view your health metrics
              </p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700">
                Connect Device
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function MetricCard({ name, value, icon }) {
    return (
      <div className="bg-white border rounded-lg p-4 flex flex-col items-center transition-all hover:shadow-md">
        <div className="mb-2">{icon}</div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-sm text-gray-500">{name}</div>
      </div>
    );
  }
  
  // Metric Icons (Simplified placeholders)
  function HeartRateIcon() {
    return <div className="p-3 bg-red-100 text-red-500 rounded-full">❤️</div>;
  }
  
  function OxygenIcon() {
    return <div className="p-3 bg-blue-100 text-blue-500 rounded-full">O₂</div>;
  }
  
  function BPIcon() {
    return <div className="p-3 bg-purple-100 text-purple-500 rounded-full">BP</div>;
  }
  
  function StepsIcon() {
    return <div className="p-3 bg-green-100 text-green-500 rounded-full">👣</div>;
  }
  
  function SleepIcon() {
    return <div className="p-3 bg-indigo-100 text-indigo-500 rounded-full">😴</div>;
  }

  export default Metrics

// Using the backend to get data example
//   import React, { useState } from 'react';
// import axios from 'axios';
// import useSocketHealthData from '../hooks/useSocketHealthData';

// const HealthMonitor = () => {
//   const [connectedAddress, setConnectedAddress] = useState(null);
//   const { healthData, deviceStatus } = useSocketHealthData();

//   const connectDevice = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/ble/data`);
//       setConnectedAddress(res.data.address);
//     } catch (err) {
//       console.error('Connection failed:', err.message);
//     }
//   };

//   const disconnectDevice = async () => {
//     if (!connectedAddress) return;
//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/ble/disconnect/${connectedAddress}`);
//       setConnectedAddress(null);
//     } catch (err) {
//       console.error('Disconnection failed:', err.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <button onClick={connectDevice} className="bg-green-500 text-white px-4 py-2 rounded mr-2">
//         Connect
//       </button>
//       <button onClick={disconnectDevice} className="bg-red-500 text-white px-4 py-2 rounded">
//         Disconnect
//       </button>

//       {deviceStatus && <p className="mt-4">Status: {deviceStatus}</p>}

//       {healthData && (
//         <div className="mt-4">
//           <p>Heart Rate: {healthData.heartRate} bpm</p>
//           <p>Blood Pressure: {healthData.bloodPressure.systolic}/{healthData.bloodPressure.diastolic} mmHg</p>
//           <p>Steps Today: {healthData.steps}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HealthMonitor;
