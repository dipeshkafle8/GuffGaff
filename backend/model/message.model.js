const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("messages", messageSchema);

module.exports = { Message };
