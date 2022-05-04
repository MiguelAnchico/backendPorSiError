const express = require('express');
const Route = express.Router();

const ControllerDrive = require('../controllers/ControllerDrive');


Route.post('/', ControllerDrive.crearArchivo, ControllerDrive.create)
    .get('/archivo/:id',ControllerDrive.show)
    .put('/:key/:value', ControllerDrive.find, ControllerDrive.update)
    .delete('/:key/:value', ControllerDrive.deleted)


module.exports = Route;