const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
});
module.exports = mongoose.model("User", userSchema);
