const Shops = require("../models/Shop");

// Creat a Shop
exports.createShop = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.image;
  const Shop = new Shops({
    name,
    description,
    category,
    image,
  });
  try {
    const savedShop = await Shop.save();
    res.json(savedShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Shops
exports.getAllShops = async (req, res) => {
  try {
    const Shop = await Shops.find();

    res.json({ Shop });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Shop by ID
exports.getShopById = async (req, res) => {
  try {
    const Shop = await Shops.findById(req.params.id);
    if (!Shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(Shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Shop by ID
exports.updateShopById = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.image;

  try {
    const updatedShop = await Shops.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        image,
      },
      { new: true }
    );

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(updatedShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Shop by ID
exports.deleteShopById = async (req, res) => {
  try {
    const Shop = await Shops.findByIdAndDelete(req.params.id);
    if (!Shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json({ message: " Shop Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
