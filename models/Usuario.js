const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    correo: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    estaRegistrado: {
        type: Boolean,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    }, {collection: 'usuarios'});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;