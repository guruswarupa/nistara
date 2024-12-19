// lib/socketUtils.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("/api/socket", {
      transports: ["websocket", "polling"], // Try WebSocket first, then fallback to polling
    });
  }
  return socket;
};
