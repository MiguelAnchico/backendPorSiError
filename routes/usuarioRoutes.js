const express = require('express');
const Route = express.Router();

const ControllerUsuario = require('../controllers/ControllerUsuario');


Route.get('/', ControllerUsuario.listall)
    .post('/', ControllerUsuario.create)
    .get('/:key/:value', ControllerUsuario.find, ControllerUsuario.show)
    .put('/:key/:value', ControllerUsuario.find, ControllerUsuario.update)
    .delete('/:key/:value', ControllerUsuario.find, ControllerUsuario.deleted)
    .post('/login', ControllerUsuario.comprobar)
    .post('/register', ControllerUsuario.preguntar)


module.exports = Route;