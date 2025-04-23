import express from "express";
const Router = express.Router();
import {
  createHospital,
  createMember,
  getTeam,
} from "../controllers/admin.controller.js";

Router.post("/team", createMember);

Router.get("/team", getTeam);

Router.post("/hospital", createHospital);

export default Router;
