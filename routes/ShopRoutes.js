const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/ShopController");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
const { verifyToken, adminCheck } = require("../Middlewares/VerificationToken");

// Create a new shop
router.post("/:userID", verifyToken, imageUpload, ShopController.createShop);

// Get all shops (Restricted to admin only)
router.get("/", verifyToken, adminCheck, ShopController.getAllShops);

// Get a single shop by ID
router.get("/owner/:ownerId", verifyToken, ShopController.getShopOwnerById);

// Update a shop by ID
router.put(
  "/:ownerId/:id",
  verifyToken,
  imageUpload,
  ShopController.updateShopById
);

// Delete a shop by ID
router.delete("/:ownerId/:id", verifyToken, ShopController.deleteShopById);

module.exports = router;
