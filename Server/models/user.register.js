import mongoose from "mongoose";

const userRegisterSchema=new mongoose.Schema({
    name:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true,
        }
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

export const userRegister = mongoose.model("userRegister", userRegisterSchema);