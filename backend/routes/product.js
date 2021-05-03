import express from "express";
import asyncHandler from "express-async-handler";
const router = express.Router();
import Product from "../models/product.js";

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) res.json(product);
    else {
      res.status(404).json({ message: "Not found." }); // if this line is disregarded, the error will be 500 by default.
      throw new Error("Not found");
    }
  })
);

export default router;
