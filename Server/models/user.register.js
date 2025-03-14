import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { 
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});
const User = mongoose.model("User", userSchema);
export default User;
