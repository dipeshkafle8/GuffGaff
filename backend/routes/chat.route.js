const express = require("express");
const {
  createGroup,
  fetchSingleChatsForUser,
  accessChat,
  fetchGroupChatsForUser,
} = require("../controllers/chat.controllers");
const { protectedRoute } = require("../middleware/auth.middleware");

const chatRouter = express.Router();

chatRouter.get("/getAllChats", protectedRoute, accessChat);
chatRouter.get("/getSingleChats", protectedRoute, fetchSingleChatsForUser);
chatRouter.get("/getGroupChats", protectedRoute, fetchGroupChatsForUser);
chatRouter.post("/createGroup", protectedRoute, createGroup);

module.exports = { chatRouter };
