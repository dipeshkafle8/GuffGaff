const express = require("express");
const { protectedRoute } = require("../middleware/auth.middleware");
const {
  getMessages,
  sendMessage,
  getAllUsers,
} = require("../controllers/message.controllers");

const messageRoute = express.Router();
messageRoute.get("/getMessages/:chatId", protectedRoute, getMessages);
messageRoute.post("/send/message/:id", protectedRoute, sendMessage);

module.exports = {
  messageRoute,
};
