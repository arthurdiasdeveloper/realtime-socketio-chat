// models/User.js
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    email: String,
    idade: Number,
});

const User = mongoose.model('User ', usuarioSchema);
module.exports = User;