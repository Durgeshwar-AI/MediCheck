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
import patientRoutes from "./routes/Patient.route.js";
import medicationRoutes from "./routes/medication.route.js";
import goalRoutes from "./routes/goal.route.js";
import { rateLimit } from 'express-rate-limit'

dotenv.config();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// You can handle socket connections here if needed
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter)

// Routes
app.use("/api/user", userRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/ble", bleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.send("Server is running with Socket.IO support.");
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
