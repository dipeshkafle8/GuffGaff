const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");

const handleUserRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.find({ username: username });
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
const handleUserLogin = async (req, res) => {};
const handleUserLogout = () => {};

module.exports = {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
};
