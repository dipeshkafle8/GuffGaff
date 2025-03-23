const { Chat } = require("../model/chat.model");
const { Message } = require("../model/message.model");
const { User } = require("../model/user.model");

//get all the messages for paritcular chat
const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chat: chatId })
      .populate("sender", "username pic email")
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
      sender: req.user.id,
      content: content,
      chat: chatId,
    };

    // create the message and get users details of that particular chat
    let message = await Message.create(newMessage);
    message = await message.populate("chat");
    message = await message.populate("sender");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username pic email",
    });

    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    res
      .status(200)
      .json({ status: true, msg: "Message created", message: message });
  } catch (err) {
    console.log("Error in sending messages");
    res.status(500).json({ status: false, msg: "Error in sending messages" });
  }
};

module.exports = {
  getMessages,
  sendMessage,
};
