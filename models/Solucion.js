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
        required: true
    },
    problema: {
        type: String,
        required: true
    },
    implementacion: {
        type: Array,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    descripcion: {
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
    }, {collection: 'soluciones'});

const Solucion = mongoose.model('Solucion', SolucionSchema);

module.exports = Solucion;