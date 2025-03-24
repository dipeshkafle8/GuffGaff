const express = require("express");
const cookie = require("cookie-parser");
const http = require("http");
const cors = require("cors");
const { connectDB } = require("./config/db.config");
const { userRouter } = require("./routes/user.route");
const { messageRoute } = require("./routes/message.route");
const { chatRouter } = require("./routes/chat.route");
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
    origin: ["http://localhost:5173", "https://guff-gaff-chat.vercel.app"],
    credentials: true,
  })
);
const server = http.createServer(app);
setupSocket(server);

app.use("/api/user", userRouter);
app.use("/api/message", messageRoute);
app.use("/api/chat", chatRouter);

server.listen(port, () => {
  console.log(`Server running successfully at ${port}`);
});
