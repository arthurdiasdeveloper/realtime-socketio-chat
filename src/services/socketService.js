const User = require('../models/User');



const users = [];
const rooms = [];

const addUser  = async (socket, socketId) => {
   socket.on("getUser ", async ({ user }) => {
       const userExists = await User.findOne({ name: user.name });
       if (!userExists) {
           const newUser  = new User({ ...user, socketId });
           await newUser .save();
           users.push({ ...user, socketId });
           console.log(`User  ${user.name} connected with socketId: ${socketId}`);
       }
       socket.emit("getUser ", { user });
   });
};

const listUsers = (socket) => {
   socket.on("listUsers", () => {
       socket.emit("listUsers", users);
   });
};

const removeUser  = (socketId) => {
   const index = users.findIndex((user) => user.socketId === socketId);
   if (index !== -1) users.splice(index, 1);
};

const createDefaultRooms = () => {
   const defaultRoomNames = [
       "Agronegócio Global",
       "Mercado de Petróleo",
       "Mercado de Energia",
       "Metais Preciosos",
       "Energia e Gás Natural",
       "Outros",
   ];
   defaultRoomNames.forEach((roomName) => {
       if (!rooms.some((room) => room.name === roomName)) {
           rooms.push({ name: roomName, messages: [], members: [] });
           console.log(`Created room: ${roomName}`);
       }
   });
};

const joinRoom = (socket, roomName) => {
   socket.join(roomName);
   const room = rooms.find((room) => room.name === roomName);
   if (room && !room.members.includes(socket.id)) {
       room.members.push(socket.id);
       console.log(`User  ${socket.id} joined room: ${roomName}`);
   } else {
       console.log(`Room ${roomName} not found`);
   }
};

const showRooms = (socket, io) => {
   socket.on("showRooms", () => {
       io.emit("showRooms", rooms);
   });
};

const showSpecificRoom = (socket, io) => {
   socket.on("showSpecificRoom", (roomName) => {
       const room = rooms.find((room) => room.name === roomName);
       io.emit("showSpecificRoom", room);
   });
};

const handleChatMessage = async (socket, io) => {
   socket.on("chat", async (chat, roomName) => {
       const room = rooms.find((room) => room.name === roomName);
       if (room) {
           const message = new Message({ room: roomName, message: chat, socketId: socket.id });
           await message.save();
           room.messages.push(message);
           io.to(roomName).emit("sendChat", chat, socket.id);
       }
   });
};

const handleListMessages = (socket) => {
   socket.on("listMessages", async (roomName) => {
       const room = rooms.find((room) => room.name === roomName);
       socket.emit("messageList", room ? room.messages : []);
   });
};

const handleUsernameChange = (socket) => {
   socket.on("usernameChange", (username, socketId, roomName) => {
       socket.to(roomName).emit("resetChat", username, socketId);
   });
};

const handleDisconnect = (socket, io) => {
   socket.on("disconnect", () => {
       console.log("User  disconnected:", socket.id);
       removeUser (socket.id);
       socket.broadcast.emit("disconnectNotification", socket.id);
   });
};

const initSocket = (io) => {
   createDefaultRooms();

   io.on("connection", (socket) => {
       addUser (socket, socket.id);
       listUsers(socket);
       handleChatMessage(socket, io);
       handleListMessages(socket);
       handleUsernameChange(socket);
       handleDisconnect(socket, io);
       showRooms(socket, io);

       socket.on("joinRoom", (roomName) => joinRoom(socket, roomName));
       socket.on("showSpecificRoom", (roomName) => showSpecificRoom(socket, io, roomName));
   });
};

module.exports = { initSocket, users, rooms };