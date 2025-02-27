import express from "express";
import { configDotenv } from "dotenv";

configDotenv();
const app = express();
const PORT = process.env.port || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
