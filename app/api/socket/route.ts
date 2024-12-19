// app/api/socket/route.ts
import { Server } from "socket.io";

let io: Server;

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for socket connections
    externalResolver: true,
  },
};

export default function handler(req: any, res: any) {
  if (!io) {
    // Initialize the Socket.io server
    io = new Server(res.socket.server, {
      path: "/api/socket", // Make sure the path is correctly set
      cors: {
        origin: "*", // Allow all origins or set specific ones
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`Device connected: ${socket.id}`);

      // Listen for location updates from clients
      socket.on("updateLocation", (data: { lat: number; lng: number; role: "help" | "rescuer"; deviceId: string }) => {
        console.log("Location updated:", data);
        io.emit("locationUpdate", data); // Broadcast location updates to all clients
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`Device disconnected: ${socket.id}`);
      });
    });
  }

  res.end(); // Finish the request
}
