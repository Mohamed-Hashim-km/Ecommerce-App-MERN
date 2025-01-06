import express from "express"
import { createProducts, getProducts } from "../controllers/productControllers.js"

const router = express.Router()
router.route("/").get(getProducts).post(createProducts)




export default router