const mongoose = require('mongoose');

const TemaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        required: true
    },
    contenido: {
        type: Array,
        required: false
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    }, {collection: 'temas'});

const Tema = mongoose.model('Tema', TemaSchema);

module.exports = Tema;