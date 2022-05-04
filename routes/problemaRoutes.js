const express = require('express');
const Route = express.Router();

const ControllerProblema = require('../controllers/ControllerProblema');


Route.get('/', ControllerProblema.listall)
    .post('/', ControllerProblema.create)
    .get('/:key/:value', ControllerProblema.find, ControllerProblema.show)
    .put('/:key/:value', ControllerProblema.find, ControllerProblema.update)
    .delete('/:key/:value', ControllerProblema.find, ControllerProblema.deleted)


module.exports = Route;