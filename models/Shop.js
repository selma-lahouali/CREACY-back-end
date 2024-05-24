
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
      required: true,
      // default:
      //   "https://www.kcnpnm.org/global_graphics/default-store-350x350.jpg",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Shops = mongoose.model("Shop", shopSchema);

module.exports = Shops;
