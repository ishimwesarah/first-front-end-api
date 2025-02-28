import User from "../models/userModal.js";
import bcrypt  from "bcryptjs"
import { generateAccessToken } from "../utils/tokenGenerating.js";
export const Register = async (req, res) => {
  try {
  const { userName, userEmail, userPassword, userRole } = req.body;

    const existingUser= await User.findOne({userEmail});
    if(existingUser){
    return res.status(400).json({message: "Email already exists"});
}
const hashedPassword= await bcrypt.hash(userPassword, 10);
const user=new User({
userName,
userEmail,
userPassword:hashedPassword,
userRole,

});
user.tokens.accessToken=generateAccessToken(user);
await user.save();
res.status(201).json({message: "Account created successful !",
    user: {
        ...user.toObject(),
        tokens: {
            accessToken: user.tokens.accessToken,
        },
    },
});

}
catch(error){
    res.status(500).json({message: "Failed to register user", error: error.message});

}
};
export const Login= async(req, res)=>{
    try{
        const{userEmail, userPassword}=req.body;
        const user= await
    }
}