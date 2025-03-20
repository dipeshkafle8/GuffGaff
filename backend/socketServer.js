const { Server } = require("socket.io");
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data);
    });
  });

  return io;
};

module.exports = { setupSocket };
