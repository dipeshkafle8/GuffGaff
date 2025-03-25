import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("https://guffgaff-pwda.onrender.com", {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Connect to Socket");
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Disconnected from socket");
  }
};

export const getSocket = (): Socket | null => socket;
