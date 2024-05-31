const express = require("express");0
const router = express.Router();
const ProductsControllers = require("../controllers/ProductsControllers");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
const { verifyToken } = require("../Middlewares/VerificationToken");

// Create a new product
router.post(
  "/:userID",
  verifyToken,
  imageUpload,
  ProductsControllers.createProduct
);

// Get all products from all shops
router.get("/", verifyToken, ProductsControllers.getAllProducts);

// Get all products from a shop by owner id
router.get(
  "/owner/:ownerId",
  verifyToken,
  ProductsControllers.getAllProductsByOwner
);
// Get a single product by ID
router.get("/:id", verifyToken, ProductsControllers.getProductById);

// Update a product by ID
router.put(
  "/:id",
  verifyToken,
  imageUpload,
  ProductsControllers.updateProductById
);

// Delete a product by ID
router.delete("/:id", verifyToken, ProductsControllers.deleteProductById);

// update Product Description / update Product Description
router.put(
  "/description/:id",
  imageUpload,
  verifyToken,
  ProductsControllers.updateProductDescription
);
// Like/Unlike a product
router.put(
  "/like/:userID/:id",
  verifyToken,
  ProductsControllers.toggleLikeProduct
);
// update Product Quantity after successful purchase
router.put(
  "/quantity/:userId/:id",
  verifyToken,
  ProductsControllers.updateProductQuantity
);

module.exports = router;
