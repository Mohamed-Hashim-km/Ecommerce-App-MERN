import express from "express";
import { createOrder, getMyOrders, getOrderByID } from "../controllers/orderControllers.js";
import { protect } from "../middleWares/authMiddleWare.js";

const router=express.Router();

router.route("/").post(protect,createOrder)
router.route("/:id").get(protect,getOrderByID)
router.route("/mine").get(protect,getMyOrders)






export default router