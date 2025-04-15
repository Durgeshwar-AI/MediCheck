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

app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/ble", bleRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with Socket.IO support.");
});

