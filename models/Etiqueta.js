const mongoose = require('mongoose');

const EtiquetaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    }, {collection: 'etiquetas'});

const Etiqueta = mongoose.model('Etiqueta', EtiquetaSchema);

module.exports = Etiqueta;