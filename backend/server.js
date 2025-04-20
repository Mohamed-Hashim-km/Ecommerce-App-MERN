import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // Fixed typo
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

// Enable CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ecommerce-app-mern-112.onrender.com"], // Replace with your Vercel URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // Fixed typo
app.use("/api/order", userOrder);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// For deployment (uncomment if serving frontend from backend)
// app.use(express.static(path.join(__dirname, "/frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
