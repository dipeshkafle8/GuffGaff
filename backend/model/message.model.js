const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  messageType: { type: String, default: "text" },
  content: { type: String, required: true },
  isDelivered: { type: Boolean, default: false },

  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Message = mongoose.model("messages", messageSchema);

module.exports = { Message };
