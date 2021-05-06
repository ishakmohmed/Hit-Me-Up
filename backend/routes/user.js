import express from "express";
const router = express.Router();
import { authenticateUser, getUserProfile } from "../controllers/user.js";
import { protectRoute } from "../middleware/auth.js";

router.post("/login", authenticateUser);
router.route("/profile").get(protectRoute, getUserProfile);

export default router;
