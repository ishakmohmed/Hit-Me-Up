const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");
const FollowerModel = require("../models/FollowerModel");
const NotificationModel = require("../models/NotificationModel");
const ChatModel = require("../models/ChatModel");

const userPng =
  "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"; // just a random "no user" pic from Google
const regexUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 1) return res.status(401).send("Invalid");
    if (!regexUsername.test(username)) return res.status(401).send("Invalid");

    const user = await UserModel.findOne({ username: username.toLowerCase() });

    if (user) return res.status(401).send("Username already taken");

    return res.status(200).send("Available");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { name, email, username, password, bio, twitter, instagram } =
    req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");

  try {
    let user;

    user = await UserModel.findOne({ email: email.toLowerCase() });

    if (user) return res.status(401).send("User already registered");

    user = new UserModel({
      name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl || userPng,
    });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    let profileFields = {};

    profileFields.user = user._id;
    profileFields.bio = bio;
    profileFields.social = {};

    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;

    await new ProfileModel(profileFields).save();
    await new FollowerModel({
      user: user._id,
      followers: [],
      following: [],
    }).save();
    await new NotificationModel({ user: user._id, notifications: [] }).save();
    await new ChatModel({ user: user._id, chats: [] }).save();

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
