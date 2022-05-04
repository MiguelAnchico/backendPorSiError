const express = require('express');
const Route = express.Router();

const ControllerSolucion = require('../controllers/ControllerSolucion');


Route.get('/', ControllerSolucion.listall)
    .post('/', ControllerSolucion.create)
    .get('/:key/:value', ControllerSolucion.find, ControllerSolucion.show)
    .put('/:key/:value', ControllerSolucion.find, ControllerSolucion.update)
    .delete('/:key/:value', ControllerSolucion.find, ControllerSolucion.deleted)


module.exports = Route;