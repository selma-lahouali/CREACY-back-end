const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register controller / register controller / register controller / register controller
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.json({ message: "Registration successful", user: user });
  } catch (err) {
    console.log(err);
  }
};
// login controller / login controller / login controller / login controller / login controller

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("No user found with this email");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "5h",
    });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
// get user by id
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update user image and password
exports.updateUserById = async (req, res) => {
  const { password } = req.body;
  const image = req.image;
  try {
    let update = {};

    // Check if password needs to be updated
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8);
      update.password = hashedPassword;
    }

    // Check if profile picture needs to be updated
    if (image) {
      update.image = image; // Assuming you have a field named 'image' in your User schema
    }

    // Update user document with the updated fields
    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    // If no user found with the given ID
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

