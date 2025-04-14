import express from 'express'
const Router= express.Router()
import {Team} from "../models/admin.model.js"

Router.post("/team",(req,res)=>{

})

Router.get("/team", async (req,res)=>{
    try{
        const team=Team.find()
        res.json(team)
    }catch(err){
        console.log(err)
    }
})

export default Router