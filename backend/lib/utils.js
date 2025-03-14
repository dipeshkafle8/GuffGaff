const jwt = require("jsonwebtoken");

const generateToken = (userId, username, res) => {
  const token = jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

module.exports = { generateToken };
