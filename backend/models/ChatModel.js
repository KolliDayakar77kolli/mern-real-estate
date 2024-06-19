const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: String,
  isBot: Boolean,
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  messages: [messageSchema],
  closedAt: { type: Date },
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('Chat', chatSchema);