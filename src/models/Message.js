// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room: { type: String, required: true },
    message: { type: String, required: true },
    socketId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;