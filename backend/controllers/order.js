import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    itemsPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items.");
  }

  const order = new Order({
    itemsPrice,
    orderItems,
    paymentMethod,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    user: req.user._id,
  });

  const createdOrder = order.save();

  res.status(201).json(createdOrder);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  order = order.populate("user", "name email");

  if (order) res.json(order);
  else {
    res.status(404);
    throw new Error("Couldn't find order.");
  }
});

export { addOrderItems, getOrderById };
