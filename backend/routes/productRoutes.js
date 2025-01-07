import express from "express"
import { createProducts, getProducts, getProductsById } from "../controllers/productControllers.js"

const router = express.Router()
router.route("/").get(getProducts).post(createProducts)
router.route("/:id").get(getProductsById)





export default router