const Products = require("../models/Products");
// creat new product / creat new product / creat new product / creat new product
exports.createProduct = async (req, res) => {
  const { name, description, price, category, quantity, likes, color, size } =
    req.body;
  const image = req.image;
  const userID = req.params.userID;
  const product = new Products({
    name,
    description,
    price,
    category,
    quantity,
    image,
    likes,
    color,
    size,
    owner: userID,
  });
  try {
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all products of all shops
exports.getAllProducts = async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;
  try {
    const totalCount = await Products.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await Products.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products from a shop by owner id
exports.getAllProductsByOwner = async (req, res) => {
  const ownerId = req.params.ownerId;
  const page = req.query.page || 1;
  const pageSize = 10;
  try {
    const totalCount = await Products.countDocuments({ owner: ownerId });
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await Products.find({ owner: ownerId })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    res.json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
  const { name, description, price, category, quantity, likes, color, size } =
    req.body;
  const image = req.image;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        quantity,
        image,
        likes,
        color,
        size,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update Product Description / update Product Description
exports.updateProductDescription = async (req, res) => {
  const { description, linkDescription, extraInfo } = req.body;
  const newImageDescriptions = req.imageDescriptions || []; // Array of new image URLs

  try {
    // Retrieve the existing product to get the current imageDescription
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Append new images to the existing imageDescription array
    const updatedImageDescription = (product.imageDescription || []).concat(newImageDescriptions);

    // Update the product with the new description and imageDescription
    const updatedDescription = await Products.findByIdAndUpdate(
      req.params.id,
      {
        description,
        extraInfo,
        linkDescription,
        imageDescription: updatedImageDescription, 
      },
      { new: true }
    );

    if (!updatedDescription) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedDescription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
