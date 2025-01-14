import asyncHandler from "../middleWares/asyncHandler.js";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email Alredy exist");
  }
  // const salt=await bcryptjs.genSalt(10);
  // const encryptedPassword=await bcryptjs.hash(password, salt);
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id); //token generation using utils ,ustiks is using for avoid code repetation
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin

    });
  } else {
    res.status(400);
    throw new Error("Failed to create user");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); //token generation using utils ,ustiks is using for avoid code repetation
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin

    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});
const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({ message: "Logout succussFully" });
};
const getUserProfile = (req, res) => {};

const updateUserProfile = asyncHandler(async (req, res) => {
  
  const { name, email, password } = req.body;


  const user = await User.findById(req.user._id);
  console.log("mm", user);


  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { createUser, authUser, logout, getUserProfile, updateUserProfile };
