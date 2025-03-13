const { User } = require("../model/user.model");

const handleUserRegister = async (req, res) => {
  res.json({ msg: "Successfully recieving request" });
};
const handleUserLogin = () => {};
const handleUserLogout = () => {};

module.exports = {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
};
