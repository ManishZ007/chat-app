const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const userRoute = require("./routes/User");
const userMessage = require("./routes/Message");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userID) => {
    onlineUsers.set(userID, socket.id);
  });

  socket.on("send-msg", (paylod) => {
    const sendUserSocket = onlineUsers.get(paylod.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", paylod.message);
    }
  });
});

const PORT = process.env.PORT || 8000;

app.use("/api/auth", userRoute);
app.use("/api/messages", userMessage);

server.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});
