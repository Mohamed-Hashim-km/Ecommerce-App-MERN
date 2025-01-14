import express from "express";
import { createOrder, getMyOrders, getOrderByID, getOrders } from "../controllers/orderControllers.js";
import { admin, protect } from "../middleWares/authMiddleWare.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderByID);

export default router;
