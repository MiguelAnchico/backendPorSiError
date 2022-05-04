const Etiqueta = require('../models/Etiqueta');
const mongoose = require('mongoose');


function listall(req, res) {
    Etiqueta.find({})
        .then(etiqueta => {
            return res.json( [etiqueta] );

        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let etiqueta = new Etiqueta(req.body);
    etiqueta._id = mongoose.Types.ObjectId();
    etiqueta.save()
        .then(etiqueta =>
            res.status(201).send({ etiqueta })
        ).catch(err => res.status(500).send({ err }))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.etiqueta) return res.status(404).send({ message: 'Not Found' });
    let etiqueta = req.body.etiqueta;
    return res.status(200).send({ etiqueta });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.etiqueta) return res.status(404).send({ message: 'Not Found' });
    let etiqueta = req.body.etiqueta[0];
    etiqueta = Object.assign(etiqueta, req.body);
    etiqueta.save()
        .then(etiqueta => res.status(200).send({ message: 'Producto Updated', etiqueta })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.eventos) return res.status(404).send({ message: 'Not Found' });
    req.body.eventos[0].remove()
        .then(eventos => {
            res.status(200).send({ message: 'Producto removed', eventos })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Etiqueta.find(query).then(etiqueta => {
        if (!etiqueta.length) return next();
        req.body.etiqueta = etiqueta;
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
