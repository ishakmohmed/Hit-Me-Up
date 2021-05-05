import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404); // if this line is disregarded, the error will be 500 by default.
    throw new Error("Not found.");
  }
});

export { getProducts, getProductById };
