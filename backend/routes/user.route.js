const express = require("express");
const { protectedRoute } = require("../middleware/auth.middleware");
const {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/register", handleUserRegister);
userRouter.post("/login", handleUserLogin);
userRouter.post("/logout", handleUserLogout);
userRouter.post("/update", protectedRoute, (req, res) => {
  res.json({ msg: "Protected route is working" });
});

module.exports = { userRouter };
