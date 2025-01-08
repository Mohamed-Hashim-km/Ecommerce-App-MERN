import asyncHandler from "../middleWares/asyncHandler.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const createUser =asyncHandler(async (req,res) => {
      const {name,email,password} = req.body;
      const userExist= await User.findOne({email})
      if(userExist) {
        res.status(400);
       throw new Error("Email Alredy exist")        
      }
      const salt=await bcryptjs.genSalt(10);
      const encryptedPassword=await bcryptjs.hash(password, salt);
      const user= await User.create({name,email,password:encryptedPassword})
      if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
      }else{
        res.status(400)
        throw new Error("Failed to create user")
      }
    
});
const authUser =asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(user&& (await user.matchPassword(password))){
        let token=jwt.sign({userId:user._id},"12345",{
            expiresIn:"1d"
        })
        res.cookie("jwt",token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxage:60*60*1000,
        })
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
        
    }
    else{
        res.status(400)
        throw new Error("invalid email or password")
    }
});
const logout =async (req,res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expiresIn: new Date(0),
      });
      res.status(200).json({ message: "Logout succussFully" });
};
const getUserProfile = () => {};

export { createUser, authUser, logout, getUserProfile };
