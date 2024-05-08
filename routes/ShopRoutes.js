const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/shopController");
const { imageUpload } = require("../middlewares/middleImgUpload");
const { verifyToken } = require("../middlewares/verifyToken");

// Create a new shop
router.post("/:userID", verifyToken, imageUpload, ShopController.createShop);

// Get all shops with pagination
router.get("/",verifyToken, ShopController.getAllShops);
verifyToken,
// Get a single shop by ID
router.get("/:id",verifyToken, ShopController.getShopById);

// Update a shop by ID
router.put("/:id", verifyToken, imageUpload, ShopController.updateShopById);

// Delete a shop by ID
router.delete("/:id", verifyToken, ShopController.deleteShopById);

module.exports = router;
