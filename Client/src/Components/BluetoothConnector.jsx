import React, { useEffect, useState } from "react";
import { useHealth } from "../hooks/useHealth"; // Import the custom hook

const BluetoothConnector = () => {
  const {
    heartRate,
    oxygen,
    bp,
    steps,
    sleep,
    updateHealthData,
    health,
    updateHealth,
    device,
    updateDevice,
    deviceConnected,
    updateConnection
  } = useHealth();
  const [connectedDevice, setConnectedDevice] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch(`${API_URL}/ble/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to backend");
      }
      if (response != health) {
        updateHealth(response);
        alert(`Your health is ${health}`);
      }

      console.log("Data sent to backend successfully");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleConnect = async () => {
    try {
      const conDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          "heart_rate",
          "battery_service",
          "device_information",
          "00001810-0000-1000-8000-00805f9b34fb", // Blood Pressure
          "00001822-0000-1000-8000-00805f9b34fb", // Pulse Oximeter
          "00001826-0000-1000-8000-00805f9b34fb", // Fitness Machine
        ],
      });

      setConnectedDevice(conDevice);
      updateDevice(conDevice);
      updateConnection(true)
      const server = await conDevice.gatt.connect();

      alert(`Connected to ${device}`);

      const services = await server.getPrimaryServices();
      for (const service of services) {
        console.log("Found service:", service.uuid);
        const characteristics = await service.getCharacteristics();
        for (const char of characteristics) {
          console.log("  ↳ Characteristic:", char.uuid);
        }
      }

      // Heart Rate
      try {
        const hrService = await server.getPrimaryService("heart_rate");
        const hrChar = await hrService.getCharacteristic(
          "heart_rate_measurement"
        );
        await hrChar.startNotifications();
        hrChar.addEventListener("characteristicvaluechanged", (e) => {
          const value = e.target.value;
          const hr = value.getUint8(1);
          updateHealthData({ heartRate: hr });
        });
      } catch (err) {
        console.warn("Heart Rate not available:", err.message);
      }

      // Blood Pressure
      try {
        const bpService = await server.getPrimaryService(
          "00001810-0000-1000-8000-00805f9b34fb"
        );
        const bpChar = await bpService.getCharacteristic(
          "00002a35-0000-1000-8000-00805f9b34fb"
        );
        await bpChar.startNotifications();
        bpChar.addEventListener("characteristicvaluechanged", (e) => {
          const value = e.target.value;
          const systolic = value.getFloat32(1, true);
          const diastolic = value.getFloat32(5, true);
          const bpValue = `${systolic.toFixed(1)}/${diastolic.toFixed(1)} mmHg`;
          updateHealthData({ bp: bpValue });
        });
      } catch (err) {
        console.warn("Blood Pressure not available:", err.message);
      }

      // Oxygen Level (SpO2)
      try {
        const spo2Service = await server.getPrimaryService(
          "00001822-0000-1000-8000-00805f9b34fb"
        );
        const spo2Char = await spo2Service.getCharacteristic(
          "00002a5f-0000-1000-8000-00805f9b34fb"
        );
        await spo2Char.startNotifications();
        spo2Char.addEventListener("characteristicvaluechanged", (e) => {
          const value = e.target.value;
          const spo2Value = value.getUint8(1);
          updateHealthData({ oxygen: spo2Value });
        });
      } catch (err) {
        console.warn("SpO2 not available:", err.message);
      }

      // Steps and Sleep (Fitness Machine or Custom)
      try {
        const stepsService = await server.getPrimaryService(
          "00001826-0000-1000-8000-00805f9b34fb"
        );

        const stepsChar = await stepsService.getCharacteristic(
          "CUSTOM_STEPS_UUID"
        );
        await stepsChar.startNotifications();
        stepsChar.addEventListener("characteristicvaluechanged", (e) => {
          const value = e.target.value;
          const stepsCount = value.getUint16(0, true);
          updateHealthData({ steps: stepsCount });
        });

        const sleepChar = await stepsService.getCharacteristic(
          "CUSTOM_SLEEP_UUID"
        );
        await sleepChar.startNotifications();
        sleepChar.addEventListener("characteristicvaluechanged", (e) => {
          const value = e.target.value;
          const hours = value.getUint8(0);
          const minutes = value.getUint8(1);
          const sleepTime = `${hours}h ${minutes}m`;
          updateHealthData({ sleep: sleepTime });
        });
      } catch (err) {
        console.warn("Steps/Sleep service not available:", err.message);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Failed to connect: " + error.message);
    }
  };

  const handleDisconnect = () => {
    setConnectedDevice(null);
    updateDevice("N/A");
    updateConnection(false)
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (deviceConnected) {
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
      }
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, [heartRate, oxygen, bp, steps, sleep]);

  return (
    <div className="p-2">
      <div className="flex items-center justify-center mb-6">
        <button
          onClick={connectedDevice ? handleDisconnect : handleConnect}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          {connectedDevice ? (
            "Disconnect"
          ) : (
            <div className="flex items-center">
              Connect <span className="md:block hidden ml-1.5">  Device</span>
            </div >
          )}
        </button>
      </div>
    </div>
  );
};

export default BluetoothConnector;
