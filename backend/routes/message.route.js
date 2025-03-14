const express = require("express");
const { protectedRoute } = require("../middleware/auth.middleware");
const {
  getUsers,
  getMessages,
  sendMessage,
} = require("../controllers/message.controllers");

const messageRoute = express.Router();

messageRoute.get("/users", protectedRoute, getUsers);
messageRoute.get("/getMessages/:id", protectedRoute, getMessages);

module.exports = {
  messageRoute,
};
