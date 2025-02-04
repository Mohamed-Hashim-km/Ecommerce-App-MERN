import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRouts from "./routes/userRouts.js";
import userOrder from "./routes/userOrder.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDb();
const app = express();

const allowedOrigins = ['https://ecommerce-app-mern-7ooz.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies to be sent with requests
}));

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRouts);
app.use("/api/order", userOrder);
app.use("/api/uploads", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});