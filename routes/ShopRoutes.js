const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/ShopController");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
const { verifyToken } = require("../Middlewares/VerificationToken");


// Create a new shop
router.post("/:userID", verifyToken, imageUpload, ShopController.createShop);

// Get all shops with pagination
router.get("/", verifyToken, ShopController.getAllShops);

// Get a single shop by ID
router.get("/owner/:ownerId", verifyToken, ShopController.getShopOwnerById);

// Update a shop by ID
router.put("/:id", verifyToken, imageUpload, ShopController.updateShopById);

// Delete a shop by ID
router.delete("/:id", verifyToken, ShopController.deleteShopById);

module.exports = router;
