const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (msg) => {
    io.emit("message", msg); // broadcast to all

    // Fake therapist reply
    if (msg.sender === "user") {
      setTimeout(() => {
        io.emit("message", { sender: "therapist", text: "I'm here for you. Continue..." });
      }, 1500);
    }
  });
});

server.listen(4000, () => console.log("Socket.io server running on http://localhost:4000"));
