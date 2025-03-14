const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    const isPassEqual = bcrypt.compare(password, userDetails.password);
    if (!isPassEqual) {
      return res
        .status(401)
        .json({ status: false, msg: "Password doesn't matched" });
    }

    const jwtToken = jwt.sign(
      {
        username: userDetails.username,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      }
    );

    res.status(200).json({
      status: true,
      msg: "User logged in",
      user: { username: userDetails.username, email, jwtToken },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, msg: "Internal server error" });
  }
};

//handleUserLogout
const handleUserLogout = () => {};

module.exports = {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
};
