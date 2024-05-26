const express = require("express");
const router = express.Router();
const CartControllers = require("../controllers/CartControllers");
const { verifyToken, adminCheck } = require("../Middlewares/VerificationToken");

// CREATE AND ADD TO CART
router.put("/", verifyToken, CartControllers.addToCart);

// UPDATE CART
router.put("/:id", verifyToken, CartControllers.updateCart);

// GET USER'S CART
router.get("/:id", verifyToken, CartControllers.findUserCart);

// DELETE FROM CART
router.delete("/:id", verifyToken, CartControllers.deleteFromCart);

// delete USER'S CART
router.delete("/:userId/:id", verifyToken, CartControllers.deleteUserCart);

// GET CARTS OF ALL USERS (Restricted to admin only)
router.get("/", verifyToken, adminCheck, CartControllers.getAllCarts);

module.exports = router;
