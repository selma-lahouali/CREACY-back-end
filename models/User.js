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
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      default: "user",
    },
  
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      unique: true, 
    },
  },
  {
    timestamps: true, 
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
