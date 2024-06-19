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

// Delete a chat
router.delete('/:chatId', chatController.deleteChat);

// Delete all chats
router.delete('/', chatController.deleteAllChats);

// Mark a chat as read
router.put('/:chatId/markAsRead', chatController.markAsRead);

// Get notifications count
router.get('/notifications/count', chatController.getNotificationsCount);

module.exports = router;