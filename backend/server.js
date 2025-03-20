const express = require("express");
const cookie = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { connectDB } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { messageRoute } = require("./routes/message.route");
const { setupSocket } = require("./socketServer");

require("dotenv").config(); //this will out env files data into process.env

connectDB();

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRouter);
app.use("/api/message", messageRoute);
const server = http.createServer(app);
setupSocket(server);

server.listen(port, () => {
  console.log(`Server running successfully at ${port}`);
});
