const express = require("express");
const router = express.Router();
const ChatControllers = require("../controllers/ChatControllers");

// creat chat provide senderId + receiverId
router.post('/', ChatControllers.createChat);
// get all chats for a user  
router.get('/:userId', ChatControllers.userChats);
// get a specifuque chat between 2 users
router.get('/find/:firstId/:secondId', ChatControllers.findChat);

module.exports = router;