import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import { notFound, errorHandler } from "./middleware/error.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(
    `Server is running. NODE_ENV=${process.env.NODE_ENV}. PORT=${process.env.PORT}.`
  );
});
