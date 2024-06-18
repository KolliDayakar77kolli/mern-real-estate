// server/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
