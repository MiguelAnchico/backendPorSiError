const Solucion = require('../models/Solucion');
const mongoose = require('mongoose');


function listall(req, res) {
    Solucion.find({})
        .then(solucion => {
            return res.json( [solucion] );

        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let solucion = new Solucion(req.body);
    solucion._id = mongoose.Types.ObjectId();
    solucion.save()
        .then(solucion =>
            res.status(201).send("success")
        ).catch(err => res.status(500).send({ err }))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.solucion) return res.status(404).send({ message: 'Not Found' });
    let solucion = req.body.solucion;
    return res.status(200).send({ solucion });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.solucion) return res.status(404).send({ message: 'Not Found' });
    let solucion = req.body.solucion[0];
    solucion = Object.assign(solucion, req.body);
    solucion.save()
        .then(solucion => res.status(200).send({ message: 'Producto Updated', solucion })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.solucion) return res.status(404).send({ message: 'Not Found' });
    req.body.solucion[0].remove()
        .then(solucion => {
            res.status(200).send({ message: 'Producto removed', solucion })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Solucion.find(query).then(solucion => {
        if (!solucion.length) return next();
        req.body.solucion = solucion;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = {
    listall,
    create,
    find,
    show,
    deleted,
    update,
}
