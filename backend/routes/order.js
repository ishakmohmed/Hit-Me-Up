import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById } from "../controllers/order.js";
import { protectRoute } from "../middleware/auth.js";

router.route("/").post(protectRoute, addOrderItems);
router.route("/:id").get(protectRoute, getOrderById);

export default router;
