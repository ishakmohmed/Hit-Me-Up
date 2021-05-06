import express from "express";
const router = express.Router();
import { authenticateUser } from "../controllers/user.js";

router.post("/login", authenticateUser);

export default router;