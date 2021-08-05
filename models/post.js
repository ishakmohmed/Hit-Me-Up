const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    location: { type: String },
    picUrl: { type: String },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
    comments: [
      {
        _id: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
