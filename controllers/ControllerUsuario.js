const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');


function listall(req, res) {
    Usuario.find({})
        .then(usuario => {
            return res.json( [usuario] );

        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let usuario = new Usuario(req.body);
    usuario._id = mongoose.Types.ObjectId();
    usuario.save()
        .then(usuario =>
            res.status(201).send({ usuario })
        ).catch(err => res.status(500).send({ err }))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.usuario) return res.status(404).send({ message: 'Not Found' });
    let usuario = req.body.usuario;
    return res.status(200).send({ usuario });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.usuario) return res.status(404).send({ message: 'Not Found' });
    let usuario = req.body.usuario[0];
    usuario = Object.assign(usuario, req.body);
    usuario.save()
        .then(Usuario => res.status(200).send({ message: 'Producto Updated', Usuario })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.usuario) return res.status(404).send({ message: 'Not Found' });
    req.body.eventos[0].remove()
        .then(usuario => {
            res.status(200).send({ message: 'Producto removed', usuario })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Usuario.find(query).then(usuario => {
        if (!usuario.length) return next();
        req.body.usuario = usuario;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

function comprobar(req, res){
    let password = req.body.password;
    let busqueda = {};
    busqueda["correo"] = req.body.correo;
    Usuario.find(busqueda).then(usuario => {
        if (!usuario.length) return res.send({ message: 'Correo no encontrado' });
        if(usuario[0].password == password){
            return res.send({message: "Correcto", nombre: usuario[0].nombre})
        } else{
            return res.send({message: "Contraseña incorrecta"})
        }
    }).catch(err => {
        return res.send(err)
    })
}

function preguntar(req, res){
    let busqueda = {};
    busqueda["correo"] = req.body.correo;
    Usuario.find(busqueda).then(usuario => {
        if (!usuario.length) return res.send({ message: 'Correo sin petición pendiente' });
        if(!usuario[0].estaRegistrado){
            return res.send({message: "Correcto"})
        } else{
            return res.send({message: "Correo ya registrado"})
        }
    }).catch(err => {
        return res.send(err)
    })
}

module.exports = {
    listall,
    create,
    find,
    show,
    deleted,
    update,
    comprobar,
    preguntar
}
