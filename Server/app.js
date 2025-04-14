// server.js
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

setSocketIO(io);  // Set Socket.IO instance for controllers

app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/ble", bleRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with Socket.IO support.");
});

io.on('connection', (socket) => {
  console.log(`Socket.IO client connected: ${socket.id}`);

  socket.on('healthDataFromClient', (data) => {
    console.log("Received health data from client:", data);
    io.emit('healthData', data); 
  });
  socket.on('disconnect', () => {
    console.log(`Socket.IO client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
