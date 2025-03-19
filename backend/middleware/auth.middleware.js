const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

const protectedRoute = async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      return res.status(400).json({ status: false, msg: "Token not provided" });
    }

    const parsedData = jwt.verify(token, process.env.JWT_SECRET);

    //finding that the user exists or not
    const user = await User.findOne({ _id: parsedData.userId });

    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    //getting id of logged in user
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    next();
  } catch (err) {
    return res.status(500).json({ status: false, msg: "Invalid Token" });
  }
};

module.exports = { protectedRoute };
