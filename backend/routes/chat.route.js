const express = require("express");
const {
  createGroup,
  fetchChatsForUser,
  accessChat,
} = require("../controllers/chat.controllers");
const { protectedRoute } = require("../middleware/auth.middleware");

const chatRouter = express.Router();

chatRouter.get("/getAllChats", protectedRoute, accessChat);
chatRouter.get("/getChats", protectedRoute, fetchChatsForUser);
chatRouter.post("/createGroup", protectedRoute, createGroup);

module.exports = { chatRouter };
