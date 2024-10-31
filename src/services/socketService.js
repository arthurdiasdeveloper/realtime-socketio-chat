const users = [];
const rooms = [];

const addUser = (socket, socketId) => {
  socket.on("getUser", ({ user }) => {
    const userExists = users.some((u) => u.name === user.name);
    if (!userExists) {
      users.push({ ...user, socketId });
    }
    console.log(`User ${user.name} connected with socketId: ${socketId}`);
    socket.emit("getUser", { user });
  });
};

const listUsers = (socket) => {
  socket.on("listUsers", () => {
    socket.emit("listUsers", users);
  });
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
    const roomExists = rooms.some((room) => room.name === roomName);
    if (!roomExists) {
      rooms.push({ name: roomName, messages: [], members: [] });
      console.log(`Created room: ${roomName}`);
    }
  });
};

const removeUser = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index !== -1) users.splice(index, 1);
};

const joinRoom = (socket, roomName) => {
  socket.join(roomName);
  const room = rooms.find((room) => room.name === roomName);
  if (room && !room.members.includes(socket.id)) {
    room.members.push(socket.id);
    console.log(`User ${socket.id} joined room: ${roomName}`);
  }
};

const handleChatMessage = (socket, io) => {
  socket.on("chat", (id, chat, roomName) => {
    const room = rooms.find((room) => room.name === roomName);
    const message = { userId: id, message: chat, socketId: socket.id };
    if (room) {
      room.messages.push(message);
      io.to(roomName).emit("sendChat", id, chat, socket.id);
    }
  });
};

const handleListMessages = (socket) => {
  socket.on("listMessages", (roomName) => {
    const room = rooms.find((room) => room.name === roomName);
    const roomMessages = room ? room.messages : [];
    socket.emit("messageList", roomMessages);
  });
};

const handleUsernameChange = (socket) => {
  socket.on("usernameChange", (username, socketId, roomName) => {
    socket.to(roomName).emit("resetChat", username, socketId);
  });
};

const handleDisconnect = (socket, io) => {
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    removeUser(socket.id);
    socket.broadcast.emit("disconnectNotification", socket.id);
  });
};

const showRooms = (socket, io) => {
  socket.on("showRooms", () => {
    io.emit("showRooms", rooms);
  });
};

const initSocket = (io) => {
  createDefaultRooms();

  io.on("connection", (socket) => {
    addUser(socket, socket.id);

    socket.on("joinRoom", (room) => {
      joinRoom(socket, room);
    });

    listUsers(socket);
    handleChatMessage(socket, io);
    handleListMessages(socket);
    handleUsernameChange(socket);
    handleDisconnect(socket, io);
    showRooms(socket, io);
  });
};

module.exports = { initSocket, users, rooms };
