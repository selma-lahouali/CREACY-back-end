const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.userId;
      next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ error: "Invalid token." });
  }
};
exports.adminCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(401).json({ error: "You don't have permission" });
    }
    next(); 
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

