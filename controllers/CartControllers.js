const Cart = require("../models/Cart");
const User = require("../models/User");

// CREATE AND ADD TO CART
exports.addToCart = async (req, res) => {
  const userId = req.userId;
  const productDetails = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ user: userId, products: [productDetails] });
      await cart.save();
      return res.status(200).send("Created a cart and added the product");
    }
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId === productDetails.productId
    );
    if (existingProductIndex !== -1) {
      // If the product already exists in the cart, update its quantity
      cart.products[existingProductIndex].quantity += productDetails.quantity;
    } else {
      // If the product doesn't exist in the cart, add it
      cart.products.push(productDetails);
    }

    await cart.save();
    res.status(200).send("Added to cart");
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE
exports.updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { $set: req.body }, // Ensure to validate req.body for allowed updates
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
exports.deleteFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.userId },
      { $pull: { products: { productId: req.params.id } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// GET USER's CART
exports.findUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET CARTS OF ALL USERS
exports.getAllCarts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(403).json({ error: "Access forbidden." });
    }
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};
