const express = require("express");
const router = express.Router();
const MessageControllers = require("../controllers/MessageControllers");

// creat message
router.post("/", MessageControllers.addMessage);

// get chat messages
router.get("/:chatId", MessageControllers.getMessages);

module.exports = router;
