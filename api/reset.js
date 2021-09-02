const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const isEmail = require("validator/lib/isEmail");

const UserModel = require("../models/UserModel");
const baseUrl = require("../utils/baseUrl");
const options = {
  auth: {
    api_key: process.env.SENDGRID_API,
  },
};
const transporter = nodemailer.createTransport(sendGridTransport(options));

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) return res.status(401).send("Invalid email");

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(404).send("User not found");

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;
    await user.save();

    const href = `${baseUrl}/reset/${token}`;
    const mailOptions = {
      to: user.email,
      from: "ishakmohmed1911@gmail.com",
      subject: "Hit Me Up Password Reset Request",
      html: `<p>Hey ${user.name
        .split(" ")[0]
        .toString()}, there was a request for password reset for your account. Click <a href=${href}>here</a> to reset your password.</p>
      <p>This token is valid for only 1 hour.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => err && console.log(err));

    return res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/token", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) return res.status(401).send("Unauthorized");
    if (password.length < 6)
      return res.status(401).send("Password must be at least 6 characters");

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) return res.status(404).send("User not found");
    if (Date.now() > user.expireToken)
      return res.status(401).send("Token expired");

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = "";
    user.expireToken = undefined;
    await user.save();

    return res.status(200).send("Password updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
