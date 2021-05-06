import express from "express";
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getUserProfile,
} from "../controllers/user.js";
import { protectRoute } from "../middleware/auth.js";

router.route("/").post(registerUser);
router.post("/login", authenticateUser);
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
