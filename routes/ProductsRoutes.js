const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsControllers");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");

// Create a new product
router.post("/", imageUpload, ProductController.createProduct);

// Get all products
router.get("/", ProductController.getAllProducts);

// Get a single product by ID
router.get("/:id", ProductController.getProductById);

// Update a product by ID
router.put("/:id", imageUpload, ProductController.updateProductById);

// Delete a product by ID
router.delete("/:id", ProductController.deleteProductById);

module.exports = router;
