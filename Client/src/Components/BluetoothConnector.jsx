import React, { useEffect } from "react";
import { useHealthData } from './HealthDataContext'; // Import the custom hook

const BluetoothConnector = () => {
  const { heartRate, oxygen, bp, steps, sleep, updateHealthData } = useHealthData(); // Use the context
  const [connectedDevice, setConnectedDevice] = useState(null);

  const API_URL=import.meta.env.VITE_API_URL

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(`${API_URL}/api/ble/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to backend");
      }
      console.log("Data sent to backend successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleConnect = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          "heart_rate",
          "battery_service",
          "blood_pressure",
          "device_information",
          "00001822-0000-1000-8000-00805f9b34fb", // pulse oximeter (SpO2)
          "00001826-0000-1000-8000-00805f9b34fb", // fitness machine (steps, sleep)
        ],
      });

      setConnectedDevice(device);
      const server = await device.gatt.connect();

      // Heart Rate
      const hrService = await server.getPrimaryService("heart_rate");
      const hrChar = await hrService.getCharacteristic("heart_rate_measurement");
      await hrChar.startNotifications();
      hrChar.addEventListener("characteristicvaluechanged", (e) => {
        const value = e.target.value;
        const hr = value.getUint8(1);
        updateHealthData({ heartRate: hr });
      });

      // Oxygen Level (SpO2)
      const spo2Service = await server.getPrimaryService("00001822-0000-1000-8000-00805f9b34fb");
      const spo2Char = await spo2Service.getCharacteristic("00002a5f-0000-1000-8000-00805f9b34fb");
      await spo2Char.startNotifications();
      spo2Char.addEventListener("characteristicvaluechanged", (e) => {
        const value = e.target.value;
        const spo2Value = value.getUint8(1);
        updateHealthData({ oxygen: spo2Value });
      });

      // Blood Pressure
      const bpService = await server.getPrimaryService("blood_pressure");
      const bpChar = await bpService.getCharacteristic("blood_pressure_measurement");
      await bpChar.startNotifications();
      bpChar.addEventListener("characteristicvaluechanged", (e) => {
        const value = e.target.value;
        const systolic = value.getUint8(1);
        const diastolic = value.getUint8(3);
        const bloodPressure = `${systolic}/${diastolic}`;
        updateHealthData({ bp: bloodPressure });
      });

      // Steps (custom service)
      const stepsService = await server.getPrimaryService("00001826-0000-1000-8000-00805f9b34fb");
      const stepsChar = await stepsService.getCharacteristic("CUSTOM_STEPS_UUID");
      await stepsChar.startNotifications();
      stepsChar.addEventListener("characteristicvaluechanged", (e) => {
        const value = e.target.value;
        const stepsCount = value.getUint16(0, true);
        updateHealthData({ steps: stepsCount });
      });

      // Sleep (custom service)
      const sleepChar = await stepsService.getCharacteristic("CUSTOM_SLEEP_UUID");
      await sleepChar.startNotifications();
      sleepChar.addEventListener("characteristicvaluechanged", (e) => {
        const value = e.target.value;
        const hours = value.getUint8(0);
        const minutes = value.getUint8(1);
        const sleepTime = `${hours}h ${minutes}m`;
        updateHealthData({ sleep: sleepTime });
      });
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect: " + error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      sendDataToBackend({
        heartRate,
        oxygen,
        bp,
        steps,
        sleep,
      });
      console.log("Sending aggregated data to backend:", {
        heartRate,
        oxygen,
        bp,
        steps,
        sleep,
      });
    }, 300000); // 5 minutes (300,000 ms)

    return () => {
      clearInterval(interval);
    };
  }, [heartRate, oxygen, bp, steps, sleep]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={connectedDevice ? () => setConnectedDevice(null) : handleConnect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {connectedDevice ? "Disconnect" : "Connect Device"}
        </button>
      </div>

      <div className="text-lg mb-4">
        <p><strong>Device Name:</strong> {connectedDevice?.name || "N/A"}</p>
        <p><strong>Heart Rate:</strong> {heartRate !== null ? `${heartRate} bpm` : "N/A"}</p>
        <p><strong>Oxygen Level:</strong> {oxygen !== null ? `${oxygen}%` : "N/A"}</p>
        <p><strong>Blood Pressure:</strong> {bp || "N/A"}</p>
        <p><strong>Steps:</strong> {steps !== null ? steps : "N/A"}</p>
        <p><strong>Sleep:</strong> {sleep || "N/A"}</p>
      </div>
    </div>
  );
};

export default BluetoothConnector;
