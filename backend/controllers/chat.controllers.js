const { Chat } = require("../model/chat.model");

const accessChat = async (req, res) => {
  try {
    const { userId } = req.query;

    let myId = req.user.id;
    if (!userId) {
      return res.status(400).json({ status: false, msg: "userId not present" });
    }

    let existingChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [myId, userId] },
    })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name pic email" },
      });

    //if chat exists
    if (existingChat) {
      return res.status(200).json({ status: true, chat: existingChat });
    }

    // Create a new chat if no exising chat is found
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [myId, userId],
    };
    const newChat = await Chat.create(chatData);

    const updatedChat = await Chat.findById(newChat._id)
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name pic email" },
      });

    return res.status(200).json({ status: true, chat: updatedChat });
  } catch (err) {
    console.log("Error in accessing chat", err);
    res.status(500).json({ status: false, msg: "Error in accessing chat" });
  }
};

//to fetch chat of one to one user
const fetchSingleChatsForUser = async (req, res) => {
  try {
    let myId = req.user.id;
    let chats = await Chat.find({ users: myId, isGroupChat: false })
      .populate("users", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name pic email" },
      })
      .sort({ updatedAt: -1 }); //sort by latest updated chat

    res.status(200).json({ status: true, chats });
  } catch (err) {
    console.log("Error in fetching chats of particular users");
    res
      .status(500)
      .json({ status: false, msg: "Error in fetching chats of users" });
  }
};

//for fetching chats of group users

const fetchGroupChatsForUser = async (req, res) => {
  try {
    let myId = req.user.id;
    let chats = await Chat.find({ users: myId, isGroupChat: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "name email pic" },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({ status: true, msg: "Sucessfully fetched", chats });
  } catch (err) {
    console.log("Error in fetching group details", err);
    res
      .status(500)
      .json({ status: false, msg: "Error in fetching group details" });
  }
};

const createGroup = async (req, res) => {
  try {
    if (!req.body.users) {
      return res
        .status(400)
        .json({ status: false, msg: "Please fill all the fields" });
    }
    let users = JSON.parse(req.body.users);
    if (users.length < 2) {
      return res.status(400).json({
        status: false,
        msg: "At least two users are required to create group",
      });
    }
    users.push(req.user);
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const createdGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({ status: true, group: createdGroupChat });
  } catch (err) {
    console.log("Error in creating group", err);
    res.status(500).json({ status: false, msg: "Error in creating group" });
  }
};

module.exports = {
  accessChat,
  fetchSingleChatsForUser,
  createGroup,
  fetchGroupChatsForUser,
};
