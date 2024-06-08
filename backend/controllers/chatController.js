const Chat = require('../models/ChatModel');

// Create a new chat
exports.createNewChat = async (req, res) => {
  try {
    const newChat = new Chat({ messages: [], isRead: false });
    const savedChat = await newChat.save();
    req.io.emit('newChat', savedChat); // Emit new chat event
    res.status(201).send(savedChat);
  } catch (error) {
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
    req.io.emit('updateChat', updatedChat); // Emit update chat event
    res.status(200).send(updatedChat);
  } catch (error) {
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
    req.io.emit('closeChat', updatedChat); // Emit close chat event
    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all chats
exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ closedAt: -1 });
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete a chat
exports.deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) return res.status(404).send({ message: 'Chat not found' });

    req.io.emit('deleteChat', chatId); // Emit delete chat event
    res.status(200).send({ message: 'Chat deleted successfully' });
  } catch (error) {
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
    req.io.emit('markAsRead', updatedChat); // Emit mark as read event
    res.status(200).send(updatedChat);
  } catch (error) {
    res.status(500).send(error);
  }
};








// // server/controllers/chatController.js
// const Chat = require('../models/chatModel');

// // Create a new chat document for a new session
// exports.createNewChat = async (req, res) => {
//   try {
//     const chat = new Chat();
//     await chat.save();
//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Add a message to the existing chat document
// exports.addMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { text, isBot } = req.body;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send({ message: 'Chat not found' });
//     }

//     chat.messages.push({ text, isBot, timestamp: new Date() });
//     await chat.save();

//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Close the chat document
// exports.closeChat = async (req, res) => {
//   try {
//     const { chatId } = req.params;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send({ message: 'Chat not found' });
//     }

//     chat.closedAt = Date.now();
//     await chat.save();

//     res.status(200).send({ message: 'Chat closed successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get all chat documents
// exports.getAllChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({});
//     res.send(chats);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };


// exports.deleteChat = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     await Chat.findByIdAndDelete(chatId);
//     res.status(200).send({ message: 'Chat deleted successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // server/controllers/chatController.js
// exports.markAsRead = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     await Chat.findByIdAndUpdate(chatId, { isRead: true });
//     res.status(200).send({ message: 'Chat marked as read successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };












// // server/controllers/chatController.js
// const Chat = require('../models/chatModel');

// // Create a new chat document
// exports.createNewChat = async (req, res) => {
//   try {
//     const chat = new Chat();
//     await chat.save();
//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Add a message to the existing chat document
// exports.addMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params;
//     const { text, isBot } = req.body;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send({ message: 'Chat not found' });
//     }

//     chat.messages.push({ text, isBot });
//     await chat.save();

//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Close the chat document
// exports.closeChat = async (req, res) => {
//   try {
//     const { chatId } = req.params;

//     const chat = await Chat.findById(chatId);
//     if (!chat) {
//       return res.status(404).send({ message: 'Chat not found' });
//     }

//     chat.closedAt = Date.now();
//     await chat.save();

//     res.status(200).send({ message: 'Chat closed successfully' });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get all chat documents
// exports.getAllChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({});
//     res.send(chats);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };








// // server/controllers/chatController.js
// const Chat = require('../models/chatModel');

// // Handle new chat messages
// exports.addChat = async (req, res) => {
//   try {
//     const chat = new Chat(req.body);
//     await chat.save();
//     res.status(201).send(chat);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // Get all chat messages
// exports.getAllChats = async (req, res) => {
//   try {
//     const chats = await Chat.find({});
//     res.send(chats);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
