const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    category: {
      type: String,
      // required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imageUpload",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
