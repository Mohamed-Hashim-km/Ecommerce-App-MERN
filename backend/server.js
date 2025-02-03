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



// Allowed origins (frontend URLs)
const allowedOrigins = [
  "https://ecommerce-app-mern-aiyc.vercel.app", // Production Frontend
  "http://localhost:5173", // Local Development Frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Important for authentication
  })
);



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

const __dirname = path.resolve(); // current folder path get publically  (ecommerce app kochi)
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //For publicilly accessable

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
