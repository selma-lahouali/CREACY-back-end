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
    // categories will change
    category: {
      type: String,
      enum: ["clothing", "accessory", "shoes", "home decoration"],
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      default: "seller",
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
