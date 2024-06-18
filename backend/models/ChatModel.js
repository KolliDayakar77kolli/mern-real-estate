// server/models/Chat.js
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








// pre final
// // server/models/Chat.js
// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   text: String,
//   isBot: Boolean,
//   timestamp: { type: Date, default: Date.now },
// });

// const chatSchema = new mongoose.Schema({
//   messages: [messageSchema],
//   closedAt: { type: Date },
//   isRead: { type: Boolean, default: false },  // Add this line
// });

// module.exports = mongoose.model('Chat', chatSchema);







// // working
// // server/models/chatModel.js
// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   text: String,
//   isBot: Boolean,
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const chatSchema = new mongoose.Schema({
//   messages: [messageSchema],
//   closedAt: Date,
// });

// const Chat = mongoose.model('Chat', chatSchema);

// module.exports = Chat;










// // server/models/chatModel.js
// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   messages: [{
//     text: String,
//     isBot: Boolean,
//     timestamp: { type: Date, default: Date.now }
//   }],
//   closedAt: { type: Date },
// });

// module.exports = mongoose.model('Chat', chatSchema);















// // server/models/chatModel.js
// const mongoose = require('mongoose');

// const chatSchema = new mongoose.Schema({
//   text: String,
//   isBot: Boolean,
// });

// module.exports = mongoose.model('Chat', chatSchema);
