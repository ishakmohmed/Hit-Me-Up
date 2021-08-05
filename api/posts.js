const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/user");
const PostModel = require("../models/post");
const FollowerModel = require("../models/follower");

router.post("/", authMiddleware, async (req, res) => {
  const { text, location, picUrl } = req.body;

  if (text.length < 1)
    return res.status(401).send("Text must be atleast 1 character");

  try {
    const newPost = {
      user: req.userId,
      text,
    };

    if (location) newPost.location = location;
    if (picUrl) newPost.picUrl = picUrl;

    const post = await new PostModel(newPost).save();

    return res.json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (!post) return res.status(404).send("Post not found");

    return res.json(post);
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
});

router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { postId } = req.params;
    const post = await PostModel.findById(postId);

    if (!post) return res.status(404).send("Post not found");

    const user = await UserModel.findById(userId);

    if (post.user.toString() !== userId) {
      if (user.role === "root") {
        await post.remove();
        return res.status(200).send("Post deleted");
      } else return res.status(401).send("Unauthorized");
    }

    await post.remove();
    return res.status(200).send("Post deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});
