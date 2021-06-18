import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/order.js";
import { protectRoute } from "../middleware/auth.js";

router.route("/").post(protectRoute, addOrderItems);

export default router;
