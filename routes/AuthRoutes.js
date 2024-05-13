const express = require("express");
const router = express.Router();
const AuthControllers = require("../controllers/AuthControllers");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
const { verifyToken } = require("../Middlewares/VerificationToken");

// Register route / Register route / Register route / Register route / Register route
router.post("/register", AuthControllers.register);
// login route / login route / login route / login route / login route / login route
router.post("/login", AuthControllers.login);
// Get a single user by ID / Get a single user by ID / Get a single user by ID
router.get("/:id", verifyToken, AuthControllers.getUserById);
// update user password and image / update user password and image / update user password and image
router.put(
  "/:id/update-profile",
  verifyToken,
  imageUpload,
  AuthControllers.updateUserById
);

module.exports = router;
