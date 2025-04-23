import express from "express"
import authMiddleware from "../middleware/auth.middleware.js";
import { addGoal, deleteGoal, getGoals, updateGoal } from "../controllers/goal.controller.js";

const Router=express.Router()

Router.post('/',authMiddleware,addGoal)

Router.get('/',authMiddleware,getGoals)

Router.put('/:id',authMiddleware, updateGoal)

Router.delete('/:id',authMiddleware,deleteGoal)

export default Router