const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const User = require('../src/models/User'); // Certifique-se de que o caminho está correto
const socketService = require("./services/socketService");

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/seu_banco_de_dados';

// Conectar ao MongoDB
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado com sucesso'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

const server = http.createServer(app);
const io = socketIo(server);

const start = (port = PORT, callback) => {
    server.listen(port, () => {
        socketService.initSocket(io); // Inicializa a lógica do socket
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
    rooms: socketService.rooms,
};