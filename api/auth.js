const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const UserModel = require("../models/UserModel");
const FollowerModel = require("../models/FollowerModel");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);

    if (!user) return res.status(404).send("User not found");

    const userFollowStats = await FollowerModel.findOne({ user: userId });

    return res.status(200).json({ user, userFollowStats });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");

  try {
    const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) return res.status(401).send("Invalid credentials");

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return res.status(401).send("Invalid credentials");

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json(token);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
