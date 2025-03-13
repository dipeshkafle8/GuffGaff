const express = require("express");
const {
  handleUserLogin,
  handleUserRegister,
  handleUserLogout,
} = require("../controllers/user.controllers");

const userRouter = express.Router();

userRouter.post("/register", handleUserRegister);
userRouter.post("/login", handleUserLogin);
userRouter.post("/logout", handleUserLogout);

module.exports = { userRouter };
