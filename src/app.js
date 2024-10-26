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

// Initialize socket connections
socketService.initSocket(io);

const start = (port = PORT, callback) => {
  server.listen(port, () => {
    console.log(`Application running successfully on port: ${port}`);
    if (callback) callback(); // Signals readiness for Jest tests
  });
};

const stop = (callback) => {
  server.close(callback); // Closes the server and releases the port
};

module.exports = {
  start,
  stop,
  io,
  users: socketService.users,
  messages: socketService.messages,
};
