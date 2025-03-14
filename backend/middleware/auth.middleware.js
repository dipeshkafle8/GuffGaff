const jwt = require("jsonwebtoken");
const { User } = require("../model/user.model");

const protectedRoute = async (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.status(400).json({ status: false, msg: "Token not provided" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    next();
  } catch (err) {
    return res.status(400).json({ status: false, msg: "Invalid Token" });
  }
};

module.exports = { protectedRoute };
