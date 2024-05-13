const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthControllers");
const { VerifyToken } = require("../Middlewares/VerifyToken");
const { imageUpload } = require("../Middlewares/MiddleImgUpload");
// Register route / Register route / Register route / Register route / Register route
router.post("/register", AuthController.register);
// login route / login route / login route / login route / login route / login route
router.post("/login", AuthController.login);
// Get a single user by ID / Get a single user by ID / Get a single user by ID
router.get("/:id", VerifyToken, AuthController.getUserById);
// update user password and image / update user password and image / update user password and image
router.put(
  "/:id/update-profile",
  VerifyToken,
  imageUpload,
  AuthController.updateUserById
);

module.exports = router;
