const mongoose = require('mongoose');

const SolucionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    formato: {
        type: String,
        required: true
    },
    tema: {
        type: Array,
        required: false
    },
    soluciones: {
        type: Array,
        required: false
    },
    implementacion: {
        type: Array,
        required: false
    },
    procedencia: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    nota: {
        type: String,
        required: true
    },
    nombreValor: {
        type: String,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    }, {collection: 'problemas'});

const Problema = mongoose.model('Problema', SolucionSchema);

module.exports = Problema;