const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

//setting up an
const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  //check session is expired or not before establishing a connection
  io.use((socket, next) => {
    try {
      // get the token from the cookies
      const cookieHeader = socket.handshake.headers.cookie;

      if (!cookieHeader) {
        return next(new Error("Authentication error:No cookies found"));
      }
      //parsing the cookie and getting the token
      const parsedCookie = cookie.parse(cookieHeader);
      const token = parsedCookie.jwt;

      const user = jwt.verify(token, process.env.JWT_SECRET);
      //adding the user details which is sender details to the socket
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error:user is invalid"));
    }
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

  // return io;
};

module.exports = { setupSocket };
