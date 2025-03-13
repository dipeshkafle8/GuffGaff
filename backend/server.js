const express = require("express");
const { connectDB } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
require("dotenv").config(); //this will out env files data into process.env

connectDB();

const app = express();
const port = process.env.PORT || 8001;

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server running successfully at ${port}`);
});
