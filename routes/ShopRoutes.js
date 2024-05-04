const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/ShopController");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");

// Create a new product
router.post("/", imageUpload, ShopController.createShop);

// Get all products
router.get("/", ShopController.getAllShops);

// Get a single product by ID
router.get("/:id", ShopController.getShopById);

// Update a product by ID
router.put("/:id", imageUpload, ShopController.updateShopById);

// Delete a product by ID
router.delete("/:id", ShopController.deleteShopById);

module.exports = router;
