import express from "express";
const router = express.Router();
import {
  authenticateUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/user.js";
import { protectRoute } from "../middleware/auth.js";

router.route("/").post(registerUser);
router.post("/login", authenticateUser);
router
  .route("/profile")
  .get(protectRoute, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
