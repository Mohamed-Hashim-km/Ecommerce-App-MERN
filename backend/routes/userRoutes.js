import express from "express"
import { authUser, createUser, logout, updateUserProfile } from "../controllers/userControllers.js";
import { protect } from "../middleWares/authMiddleWare.js";

const router=express.Router();

router.route("/").post(createUser)
router.route("/auth").post(authUser)
router.route("/logout").post(logout)
router.route("/updateprofile").put(protect,updateUserProfile)







export default router