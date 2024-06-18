const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

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

// Mark a chat as read
router.put('/:chatId/markAsRead', chatController.markAsRead);

// Get notifications count
router.get('/notifications/count', chatController.getNotificationsCount);

module.exports = router;










// pre final
// // routes/chatRoutes.js
// const express = require('express');
// const router = express.Router();
// const chatController = require('../controllers/chatController');


// // Create a new chat document
// router.post('/', chatController.createNewChat);

// // Add a message to the existing chat document
// router.post('/:chatId/messages', chatController.addMessage);

// // Close the chat document
// router.patch('/:chatId/close', chatController.closeChat);

// // Get all chat documents
// router.get('/', chatController.getAllChats);

// // Delete chat
// router.delete('/:chatId', chatController.deleteChat);

// // markasRead
// router.put('/:chatId/markAsRead', chatController.markAsRead);
// module.exports = router;
