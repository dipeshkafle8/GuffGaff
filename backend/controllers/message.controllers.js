const { Message } = require("../model/message.model");
const { User } = require("../model/user.model");

const getUsers = async (req, res) => {
  try {
    let myId = req.user.id;
    const allUsers = await User.find({ _id: { $ne: myId } }).select(
      "-password"
    );
    res
      .status(200)
      .json({ status: true, msg: "Successfully got users", allUsers });
  } catch (err) {
    console.log("Error in message Controllers", err);
    res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const myId = req.user.id;
    const recieverId = req.params.id;
    //get all the messages between two users
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: recieverId },
        { senderId: recieverId, receiverId: myId },
      ],
    });

    res
      .status(200)
      .json({ status: true, msg: "Successfully recieved messages", messages });
  } catch (err) {
    console.log("Error in messageController in getMessages", err);
    res.status(500).json({ status: true, msg: "Error in getting messages" });
  }
};

const sendMessage = async (req, res) => {};

module.exports = {
  getUsers,
  getMessages,
  sendMessage,
};
