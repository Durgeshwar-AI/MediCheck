import { createBluetooth } from 'node-ble';

export const getHealthData = async (req, res) => {
  try {
    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();

    if (!(await adapter.isDiscovering())) {
      await adapter.startDiscovery();
    }

    // Replace 'Device_Name' with the actual name of your BLE device
    const device = await adapter.waitDevice('Device_Name');
    await device.connect();

    const gattServer = await device.gatt();
    // Replace 'serviceUUID' and 'characteristicUUID' with actual UUIDs
    const service = await gattServer.getPrimaryService('serviceUUID');
    const characteristic = await service.getCharacteristic('characteristicUUID');

    const data = await characteristic.readValue();
    // Process the data as per your device's protocol
    const healthData = processData(data);

    await device.disconnect();
    destroy();

    res.status(200).json({ success: true, data: healthData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to process raw data from the device
const processData = (data) => {
  // Implement data processing logic based on your device's data format
  return {
    heartRate: data.readUInt8(0),
    bloodPressure: {
      systolic: data.readUInt8(1),
      diastolic: data.readUInt8(2),
    },
    steps: data.readUInt16LE(3),
  };
};
