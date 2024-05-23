const Shops = require("../models/Shop");
const User = require("../models/User");

// Create a Shop
exports.createShop = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.image;
  const userID = req.params.userID;

  try {
    // Check if the user already owns a shop
    const existingShop = await Shops.findOne({ owner: userID });
    if (existingShop) {
      return res.status(400).json({ error: "User already has a shop." });
    }

    // Proceed with creating a new shop
    const newShop = new Shops({
      name,
      description,
      category,
      image,
      owner: userID,
    });

    const savedShop = await newShop.save();
    res.json(savedShop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Get all shops (Restricted to admin only)
exports.getAllShops = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(403).json({ error: "Access forbidden." });
    }
    const Shop = await Shops.find();
    res.status(200).json( Shop );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single Shop by Owner ID
exports.getShopOwnerById = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const shop = await Shops.findOne({ owner: ownerId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Shop by ID
exports.updateShopById = async (req, res) => {
  const { name, description, category } = req.body;
  const image = req.image;
  const ownerId = req.params.ownerId;
  const shop = await Shops.findOne({ owner: ownerId });
  if (!shop) {
    return res.status(404).json({ message: "Shop not found" });
  }
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

// Update a Shop by ID
// exports.updateShopById = async (req, res) => {
//   const { name, description, category } = req.body;
//   const image = req.image;

//   try {
//     const updatedShop = await Shops.findByIdAndUpdate(
//       req.params.id,
//       {
//         name,
//         description,
//         category,
//         image,
//       },
//       { new: true }
//     );

//     if (!updatedShop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }
//     res.json(updatedShop);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// Delete a Shop by ID
exports.deleteShopById = async (req, res) => {
  const ownerId = req.params.ownerId;
  const shop = await Shops.findOne({ owner: ownerId });
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
