const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // default:"https://icon-library.com/images/img-icon/img-icon-0.jpg",
    },
    description: {
      type: String,
      required: true,
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
      type: String,
      default: "white",
    },
    size: {
      type: String,
      default: "universal",
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
