import express from "express";
import { createProducts, deleteProduct, getProducts, getProductsById, updateProduct } from "../controllers/productControllers.js";
import { admin, protect } from "../middleWares/authMiddleWare.js";

const router = express.Router();
router.route("/").get(getProducts).post(protect, admin, createProducts);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct).delete(protect,admin,deleteProduct);

export default router;
