const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bio: { type: String, required: true },
    social: {
      twitter: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
