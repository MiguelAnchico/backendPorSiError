const express = require('express');
const Route = express.Router();

const ControllerTema = require('../controllers/ControllerTema');


Route.get('/', ControllerTema.listall)
    .post('/', ControllerTema.create)
    .get('/:key/:value', ControllerTema.find, ControllerTema.show)
    .put('/:key/:value', ControllerTema.find, ControllerTema.update)
    .delete('/:key/:value', ControllerTema.find, ControllerTema.deleted)


module.exports = Route;