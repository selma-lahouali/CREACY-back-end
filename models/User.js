const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    // Add reference to the shop model
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
      unique: true // Ensure each user can have only one shop
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
