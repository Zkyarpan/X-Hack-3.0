import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import Message from "./src/models/Message.js";

const startServer = async () => {
  try {
    await connectDB();
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: " https://255e-103-95-17-75.ngrok-free.app ",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
      });

      socket.on("send_message", async (data) => {
        try {
          const message = new Message({
            sender: data.senderId,
            receiver: data.receiverId,
            content: data.message,
          });
          await message.save();

          socket.to(data.room).emit("receive_message", data);
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    server.listen(config.port, async () => {
      console.log(`✅ Server: http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
