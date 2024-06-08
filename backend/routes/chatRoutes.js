// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// // POST request for adding a new chat message
// router.post('/', chatController.addChat);
// // GET request for fetching all chat messages
// router.get('/', chatController.getAllChats);






// Create a new chat document
router.post('/', chatController.createNewChat);

// Add a message to the existing chat document
router.post('/:chatId/messages', chatController.addMessage);

// Close the chat document
router.patch('/:chatId/close', chatController.closeChat);

// Get all chat documents
router.get('/', chatController.getAllChats);

// Delete chat
router.delete('/:chatId', chatController.deleteChat);

// markasRead
router.put('/:chatId/markAsRead', chatController.markAsRead);
module.exports = router;
