import { io, Socket } from "socket.io-client";
let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8001", {
      withCredentials: true,
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("Connect to Socket");
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
