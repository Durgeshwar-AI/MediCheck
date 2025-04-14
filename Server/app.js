import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from "./db/db.js";

import userRoutes from "./routes/user.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import bleRoutes from "./routes/ble.routes.js";
import adminRoutes from "./routes/admin.route.js";

import { setSocketIO } from './controllers/ble.controller.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setSocketIO(io);

app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/ble", bleRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with BLE and Socket.IO support.");
});

io.on('connection', (socket) => {
  console.log(`Socket.IO client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Socket.IO client disconnected: ${socket.id}`);
  });

});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`   BLE connection endpoint: GET http://localhost:${PORT}/api/ble/data`);
  console.log(`   BLE disconnect endpoint: POST http://localhost:${PORT}/api/ble/disconnect/:address`);
});

const cleanup = async () => {
  console.log('Shutting down server...');


  httpServer.close(() => {
    console.log('Server closed.');

    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcing shutdown.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);
