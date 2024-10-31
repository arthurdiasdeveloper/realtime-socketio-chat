const ioClient = require("socket.io-client");
const { start, stop } = require("../app");

const PORT = 3001;

describe("Socket Integration Tests", () => {
  let socket;

  beforeAll((done) => {
    start(PORT, done);
  });

  afterAll((done) => {
    stop(done);
  });

  beforeEach((done) => {
    socket = ioClient(`http://localhost:${PORT}`);
    socket.on("connect", () => {
      socket.emit("getUser", { user: { name: "user1", socketId: socket.id } });
      done();
    });
  });

  afterEach(() => {
    if (socket.connected) {
      socket.disconnect();
    }
  });
  test("it should verify if user was added", (done) => {
    socket.emit("listUsers");
    socket.on("listUsers", (users) => {
      const [user] = users;
      expect(user.name).toEqual("user1");
      done();
    });
  });

  test("it should add many users", (done) => {
    const usersToConnect = [
      { name: "user2", socketId: "socketId2" },
      { name: "user3", socketId: "socketId3" },
      { name: "user4", socketId: "socketId4" },
    ];
    const sockets = [];
    let connectedUsersCount = 0;

    usersToConnect.forEach((user) => {
      const socket = ioClient(`http://localhost:${PORT}`);

      socket.on("connect", () => {
        socket.emit("getUser", { user });
        connectedUsersCount += 1;

        if (connectedUsersCount === usersToConnect.length) {
          socket.emit("listUsers");
        }
      });

      socket.on("listUsers", (users) => {

        const userExists = users.some((u) => u.name === user.name);
        expect(userExists).toBe(true);
        sockets.forEach((s) => s.disconnect());
        done();
      });

      sockets.push(socket);
    });

    sockets.forEach((socket) => {
      socket.on("error", (err) => {
        console.error("Socket error:", err);
        done(err);
      });
    });
  });

  test.skip("it should list default rooms", (done) => {
    socket.emit("showRooms");
    socket.on("showRooms", (rooms) => {
      expect(rooms).toEqual([
        { name: "Agronegócio Global", messages: [], members: [] },
        { name: "Mercado de Petróleo", messages: [], members: [] },
        { name: "Mercado de Energia", messages: [], members: [] },
        { name: "Metais Preciosos", messages: [], members: [] },
        { name: "Energia e Gás Natural", messages: [], members: [] },
        { name: "Outros", messages: [], members: [] },
      ]);
      done();
    });
  });
  test.skip("it should send a 5 messages to a room", (done) => {
    Array.from({ length: 5 }).forEach((__, index) => {
      const message = `Message number ${index + 1}`;
      socket.emit("chat", "test", message);
    });
    socket.emit("listMessages", "test");
    socket.on("messageList", (messages) => {
      done();
    });
  });
});
