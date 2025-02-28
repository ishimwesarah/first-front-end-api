import mongoose from "mongoose";
const{model, Schema}=mongoose;
const userSchema=new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true
        },
        userPassword: {
            type: String,
            required: true
        },
        userRole: {
            type: String,
            default: "user",
            enum:["user", "admin"],
            required: true
        }
    },
    {
     timestamps: true   
    }
)
const User=model("users", userSchema);
export default User;