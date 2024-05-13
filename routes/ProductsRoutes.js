const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsControllers");
const { VerifyToken } = require("../Middlewares/VerifyToken");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
// Create a new product
router.post(
  "/:userID",
  VerifyToken,
  imageUpload,
  ProductController.createProduct
);

// Get all products from all shops
router.get("/", VerifyToken, ProductController.getAllProducts);
// Get all products from a shop by owner id
router.get(
  "/owner/:ownerId",
  VerifyToken,
  ProductController.getAllProductsByOwner
);

// Get a single product by ID
router.get("/:id", VerifyToken, ProductController.getProductById);

// Update a product by ID
router.put(
  "/:id",
  VerifyToken,
  imageUpload,
  ProductController.updateProductById
);

// Delete a product by ID
router.delete("/:id", VerifyToken, ProductController.deleteProductById);

module.exports = router;
