const express = require('express');
const Route = express.Router();

const ControllerEtiqueta = require('../controllers/ControllerEtiqueta');


Route.get('/', ControllerEtiqueta.listall)
    .post('/', ControllerEtiqueta.create)
    .get('/:key/:value', ControllerEtiqueta.find, ControllerEtiqueta.show)
    .put('/:key/:value', ControllerEtiqueta.find, ControllerEtiqueta.update)
    .delete('/:key/:value', ControllerEtiqueta.find, ControllerEtiqueta.deleted)


module.exports = Route;