const express = require("express");
const router = express.Router();
const ChatControllers = require("../controllers/ChatControllers");
const { verifyToken } = require("../Middlewares/VerificationToken");
// creat chat provide senderId + receiverId
router.post("/", verifyToken, ChatControllers.createChat);
// get all chats for a user
router.get("/:userId", ChatControllers.userChats);
// get a specifuque chat between 2 users
router.get("/find/:firstId/:secondId", ChatControllers.findChat);

module.exports = router;
