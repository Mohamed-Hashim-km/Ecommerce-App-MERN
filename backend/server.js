import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouts from "./routes/userRoutes.js";
import { errorHandler } from "./middleWares/errorHandler.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userOrder from "./routes/orderRoutes.js";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

dotenv.config();
connectDb();
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRouts);
app.use("/api/order", userOrder);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve(); // current folder path get publically (ecommerce app kochi)
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); // For publicly accessible

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});