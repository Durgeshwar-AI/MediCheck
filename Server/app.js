import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

import userRoutes from "./routes/user.routes.js";
import hospitalRoutes from "./routes/hospital.routes.js";
import bleRoutes from "./routes/ble.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);          
app.use("/hospital/api", hospitalRoutes);   
app.use("/api/ble", bleRoutes);             

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
