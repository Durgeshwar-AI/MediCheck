import { createBluetooth } from 'node-ble';

let io;
const connectedDevices = new Map();

export const setSocketIO = (socketIO) => {
  io = socketIO;
};

const processData = (data) => {
  try {
    if (!data || !data.buffer || data.buffer.byteLength < 5) return null;

    const heartRate = data.readUInt8(0);
    const systolic = data.readUInt8(1);
    const diastolic = data.readUInt8(2);
    const steps = data.readUInt16LE(3);

    return {
      heartRate,
      bloodPressure: { systolic, diastolic },
      steps,
    };
  } catch {
    return null;
  }
};

export const getHealthData = async (req, res) => {
  const DEVICE_NAME = 'SmartWatch'; // Adjust based on your device
  const SERVICE_UUID = 'serviceUUID';
  const CHARACTERISTIC_UUID = 'characteristicUUID';

  let device;

  try {
    if (!io) return res.status(500).json({ success: false, message: 'Socket.IO not initialized.' });

    const { bluetooth, destroy } = createBluetooth();
    const adapter = await bluetooth.defaultAdapter();

    if (!(await adapter.isDiscovering())) await adapter.startDiscovery();

    device = await adapter.waitDevice(DEVICE_NAME, 30000);
    if (!device) throw new Error("No suitable device found");

    if (!connectedDevices.has(device.address)) {
      await device.connect();
      connectedDevices.set(device.address, { device, destroy, listenerAttached: false });

      device.on('disconnect', () => {
        const info = connectedDevices.get(device.address);
        if (info?.destroy) info.destroy();
        connectedDevices.delete(device.address);
        io.emit('deviceStatus', { address: device.address, status: 'disconnected' });
      });
    } else {
      device = connectedDevices.get(device.address).device;
    }

    const gattServer = await device.gatt();
    const service = await gattServer.getPrimaryService(SERVICE_UUID);
    const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

    const deviceInfo = connectedDevices.get(device.address);
    if (!deviceInfo.listenerAttached) {
      characteristic.on('characteristicvaluechanged', (value) => {
        const healthData = processData(value);
        if (healthData) {
          io.emit('healthData', { address: device.address, data: healthData });
        }
      });

      await characteristic.startNotifications();
      deviceInfo.listenerAttached = true;
      connectedDevices.set(device.address, deviceInfo);

      io.emit('deviceStatus', { address: device.address, status: 'streaming' });
    }

    res.status(200).json({
      success: true,
      message: `Connected to ${DEVICE_NAME} (${device.address})`,
      address: device.address
    });
  } catch (error) {
    if (device?.connected) await device.disconnect().catch(() => {});
    if (connectedDevices.has(device?.address)) {
      const { destroy } = connectedDevices.get(device.address);
      if (destroy) destroy();
      connectedDevices.delete(device.address);
    }

    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleDisconnect = async (req, res) => {
  const { address } = req.params;

  if (connectedDevices.has(address)) {
    const { device, destroy } = connectedDevices.get(address);
    try {
      const gattServer = await device.gatt();
      const service = await gattServer.getPrimaryService('serviceUUID');
      const characteristic = await service.getCharacteristic('characteristicUUID');
      await characteristic.stopNotifications().catch(() => {});
      await device.disconnect();
      if (destroy) destroy();
      connectedDevices.delete(address);
      io.emit('deviceStatus', { address, status: 'disconnected' });
      res.status(200).json({ success: true, message: `Disconnected from ${address}` });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(404).json({ success: false, message: `Device ${address} not found.` });
  }
};
