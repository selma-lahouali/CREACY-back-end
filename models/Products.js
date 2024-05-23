const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "no description added yet",
    },
    extraInfo: {
      type: String,
    },
    imageDescription: {
      type: [String],
    },
    tiktok: {
      type: [String],
    },
    instagram: {
      type: [String],
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["clothing", "accessory", "shoes", "home decoration"],
    },
    color: {
      type: [String],
    },
    size: {
      type: [String],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
