const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// register controller / register controller / register controller
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
    res.json("Registration successful");
  } catch (err) {
    console.log(err);
  }
};
// login controller / login controller / login controller / login controller

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
      expiresIn: "1h",
    });
    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
