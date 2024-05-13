const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/shopController");
const { VerifyToken } = require("../Middlewares/VerifyToken");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");

// Create a new shop
router.post("/:userID", VerifyToken, imageUpload, ShopController.createShop);

// Get all shops with pagination
router.get("/", VerifyToken, ShopController.getAllShops);

// Get a single shop by ID
router.get("/owner/:ownerId", VerifyToken, ShopController.getShopOwnerById);

// Update a shop by ID
router.put("/:id", VerifyToken, imageUpload, ShopController.updateShopById);

// Delete a shop by ID
router.delete("/:id", VerifyToken, ShopController.deleteShopById);

module.exports = router;
