import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouts from "./routes/userRoutes.js";
import { errorHandler } from "./middleWares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();
connectDb();
const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRouts);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
