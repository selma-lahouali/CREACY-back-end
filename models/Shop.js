// models/Shop.js
const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: ["clothing", "accessory", "shoes", "home decoration"],
    },
    image: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
