const Chat = require('../models/ChatModel');
const Notification = require('../models/NotificationModel');

// Create a new chat
exports.createNewChat = async (req, res) => {
  try {
    const newChat = new Chat({ messages: [], isRead: false });
    const savedChat = await newChat.save();
    req.io.emit('newChat', savedChat); 

    await incrementNotifications();

    res.status(201).send(savedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Add a message to a chat
exports.addMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { text, isBot } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).send({ message: 'Chat not found' });

    const message = { text, isBot, timestamp: new Date() };
    chat.messages.push(message);
    const updatedChat = await chat.save();
    req.io.emit('updateChat', updatedChat); 

    // Increment notifications count
    await incrementNotifications();

    res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Close a chat
exports.closeChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).send({ message: 'Chat not found' });

    chat.closedAt = new Date();
    const updatedChat = await chat.save();
    req.io.emit('closeChat', updatedChat); 

    await incrementNotifications();

    res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Get all chats
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ closedAt: -1 });
    res.status(200).send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Delete a chat
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) return res.status(404).send({ message: 'Chat not found' });

    req.io.emit('deleteChat', chatId); 

    await decrementNotifications();

    res.status(200).send({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Mark a chat as read
exports.markAsRead = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);
    if (!chat) return res.status(404).send({ message: 'Chat not found' });

    chat.isRead = true;
    const updatedChat = await chat.save();
    req.io.emit('markAsRead', updatedChat); 

    await decrementNotifications();

    res.status(200).send(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Delete all chats
exports.deleteAllChats = async (req, res) => {
  try {
    const result = await Chat.deleteMany({});
    req.io.emit('deleteAllChats'); 

    await resetNotifications();

    res.status(200).send({ message: 'All chats deleted successfully', result });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Fetch notifications count
exports.getNotificationsCount = async (req, res) => {
  try {
    const notification = await Notification.findOne();
    if (!notification) {
      // If no notifications exist yet, return 0
      res.status(200).send({ count: 0 });
    } else {
      res.status(200).send({ count: notification.count });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// Helper function to increment notifications count
async function incrementNotifications() {
  try {
    let notification = await Notification.findOne();
    if (!notification) {
      notification = new Notification({ count: 1 });
    } else {
      notification.count += 1;
    }
    await notification.save();
  } catch (error) {
    console.error('Error incrementing notifications count:', error);
  }
}

// Helper function to decrement notifications count
async function decrementNotifications() {
  try {
    let notification = await Notification.findOne();
    if (notification && notification.count > 0) {
      notification.count -= 1;
      await notification.save();
    }
  } catch (error) {
    console.error('Error decrementing notifications count:', error);
  }
}

// Helper function to reset notifications count
async function resetNotifications() {
  try {
    let notification = await Notification.findOne();
    if (notification) {
      notification.count = 0;
      await notification.save();
    }
  } catch (error) {
    console.error('Error resetting notifications count:', error);
  }
}