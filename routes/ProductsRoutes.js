const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsControllers");
const { verifyToken } = require("../middlewares/VerifyToken");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
// Create a new product
router.post(
  "/:userID",
  verifyToken,
  imageUpload,
  ProductController.createProduct
);

// Get all products from all shops
router.get("/", verifyToken, ProductController.getAllProducts);
// Get all products from a shop by owner id
router.get(
  "/owner/:ownerId",
  verifyToken,
  ProductController.getAllProductsByOwner
);

// Get a single product by ID
router.get("/:id", verifyToken, ProductController.getProductById);

// Update a product by ID
router.put(
  "/:id",
  verifyToken,
  imageUpload,
  ProductController.updateProductById
);

// Delete a product by ID
router.delete("/:id", verifyToken, ProductController.deleteProductById);

module.exports = router;
