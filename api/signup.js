const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

const UserModel = require("../models/user");
const ProfileModel = require("../models/profile");
const FollowerModel = require("../models/follower");

const userPng =
  "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", async (req, res) => {
  const { username } = req.params;

  try {
    if (username.length < 1) return res.status(401).send("Invalid username");
    if (!regexUserName.test(username))
      return res.status(401).send("Invalid username");

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (user) return res.status(401).send("Username is already taken");

    return res.status(200).send("Username is available");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  const { name, email, username, password, bio, twitter, instagram } =
    req.body.user;

  if (!isEmail(email)) return res.status(401).send("Invalid Email");
  if (password.length < 6)
    return res.status(401).send("Password must be at least 6 characters");

  try {
    let user = await UserModel.findOne({ email: email.toLowerCase() });
    if (user) return res.status(401).send("User is already registered");

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
