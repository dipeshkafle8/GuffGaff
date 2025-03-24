const jwt = require("jsonwebtoken");

const generateToken = async (userId, username, res) => {
  const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, //cookie will be only accessible through web server
    secure: process.env.NODE_ENV === "production", //cookie will be sent over https in production
    sameSite: "none", // Required for cross-origin cookies
  });
  return token;
};

module.exports = { generateToken };
