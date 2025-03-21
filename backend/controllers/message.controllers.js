const { Chat } = require("../model/chat.model");
const { Message } = require("../model/message.model");
const { User } = require("../model/user.model");

const getUsers = async (req, res) => {
  try {
    let myId = req.user.id;

    //find the chats in which I have contributed and not a group chat
    const chats = await Chat.find({
      isGroupChat: false,
      users: { $in: [myId] },
    });

    //extract user Ids fro these chats
    const userIds = chats
      .flatMap((chat) => chat.users)
      .filter((userId) => userId.toString() !== myId);

    //fethch the user details for these user Ids
    const allUsers = await User.find({ _id: { $in: userIds } }).select(
      "-password"
    );

    res
      .status(200)
      .json({ status: true, msg: "Successfully fetched", Users: allUsers });
  } catch (err) {
    console.log("Error in message Controllers", err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

//get all the messages for paritcular chat
const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res
      .status(200)
      .json({ status: true, msg: "Successfully recieved messages", messages });
  } catch (err) {
    console.log("Error in messageController in getMessages", err);
    res.status(500).json({ status: true, msg: "Error in getting messages" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
      console.log("Invalid data passed");
      return res.status(400).json({ status: false, msg: "Invalid chat" });
    }

    let newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    // create the message and get users details of that particular chat
    let message = await Message.create(newMessage);
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { lastestMessage: message });
    res
      .status(200)
      .json({ status: true, msg: "Message created", message: message });
  } catch (err) {
    console.log("Error in sending messages");
    res.status(500).json({ status: false, msg: "Error in sending messages" });
  }
};

module.exports = {
  getUsers,
  getMessages,
  sendMessage,
};
