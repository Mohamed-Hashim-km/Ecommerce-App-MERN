import express from "express";
import connectDb from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import userRouts from "./routes/userRoutes.js"

connectDb();
const app = express();

const port = 5000;

app.get("/", (req, res) => {
  res.send("ecommerce");
});

app.use("/api/products",productRoutes)
app.use("/api/users",userRouts)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
