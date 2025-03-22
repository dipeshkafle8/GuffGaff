const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/utils");

//register
const handleUserRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ status: false, msg: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ status: true, msg: "User created Successfully" });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
};

//for login
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetails = await User.findOne({ email: email });

    if (!userDetails) {
      return res
        .status(404)
        .json({ status: false, msg: "User doesn't exists" });
    }
    const isPassEqual = await bcrypt.compare(password, userDetails.password);

    if (!isPassEqual) {
      return res
        .status(401)
        .json({ status: false, msg: "Password doesn't matched" });
    }

    let token = generateToken(userDetails._id, userDetails.username, res);

    res.status(200).json({
      status: true,
      msg: "User logged in",
      user: { id: userDetails._id, username: userDetails.username, email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
};

//handleUserLogout
const handleUserLogout = async (req, res) => {
  try {
    //When a cookie is set with specific attributes (httpOnly, secure, sameSite), the same attributes must be used while clearing it.
    res.clearCookie("jwt", {
      httOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ status: true, msg: "Logged Out Sucessfully" });
  } catch (err) {
    res.status(500).json({ status: false, msg: "Error while logging out" });
  }
};

//for checking authentication
const checkAuthentication = async (req, res) => {
  try {
    res
      .status(200)
      .json({ status: true, msg: "User is authenticated", user: req.user });
  } catch (err) {
    res.status(500).json({ status: false, msg: "User not authorized" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const myId = req.user.id;

    let users = await User.find({ _id: { $ne: myId } });

    res
      .status(200)
      .json({ status: true, msg: "All users fetched", Users: users });
  } catch (err) {
    console.log("Error in getting users", err);
    res.status(500).json({ status: false, msg: "Error in getting all users" });
  }
};

module.exports = {
  checkAuthentication,
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
  getAllUsers,
};
