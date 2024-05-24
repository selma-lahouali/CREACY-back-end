const Products = require("../models/Products");
// creat new product / creat new product / creat new product / creat new product
exports.createProduct = async (req, res) => {
  const { name, price, category, quantity, likes } = req.body;
  const image = req.image;
  const userID = req.params.userID;
  const product = new Products({
    name,
    price,
    category,
    quantity,
    image,
    likes,
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
  let query = {};
  try {
    const { categories } = req.query;

    if (categories) {
      const categoryArray = categories.split(",");
      query.category = { $in: categoryArray };
    }

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await Products.find(query)
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
  let query = { owner: ownerId }; // Initialize query with owner id

  try {
    const { categories } = req.query;
    if (categories) {
      const categoryArray = categories.split(",");
      query.category = { $in: categoryArray };
    }

    const totalCount = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const products = await Products.find(query)
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
  const { name, price, category, quantity, likes } = req.body;
  const image = req.image;

  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        quantity,
        image,
        likes,
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
  const { description, extraInfo, color, size, tiktok, instagram } = req.body;
  const newImageDescriptions = req.imageDescriptions || [];

  const newColor = color || [];
  const newSize = size || [];
  const newTiktok = tiktok || [];
  const newInstagram = instagram || [];
  try {
    // Retrieve the existing product to get the current imageDescription
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Append new ellement to their existing arrays
    const updatedImageDescription = (product.imageDescription || []).concat(
      newImageDescriptions
    );

    const updateNewColor = (product.color || []).concat(newColor);
    const updateNewSize = (product.size || []).concat(newSize);
    const updateNewTiktok = (product.tiktok || []).concat(newTiktok);
    const updateNewInstagram = (product.instagram || []).concat(newInstagram);

    // Update the product with the new description and imageDescription
    const updatedDescription = await Products.findByIdAndUpdate(
      req.params.id,
      {
        description,
        extraInfo,
        imageDescription: updatedImageDescription,
        color: updateNewColor,
        size: updateNewSize,
        tiktok: updateNewTiktok,
        instagram: updateNewInstagram,
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
