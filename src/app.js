const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const socketService = require("./services/socketService");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server);

const start = (port = PORT, callback) => {
  server.listen(port, () => {
    socketService.initSocket(io);
    console.log(`Application running successfully on port: ${port}`);
    if (callback) callback();
  });
};

const stop = (callback) => {
  server.close(callback);
};

if (require.main === module) {
  start();
}

module.exports = {
  start,
  stop,
  io,
  users: socketService.users,
  messages: socketService.messages,
};
