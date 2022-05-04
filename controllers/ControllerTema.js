const Tema = require('../models/Tema');
const mongoose = require('mongoose');


function listall(req, res) {
    Tema.find({})
        .then(tema => {
            return res.json( [tema] );

        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let tema = new Tema(req.body);
    tema._id = mongoose.Types.ObjectId();
    tema.save()
        .then(tema =>
            res.status(201).send({ tema })
        ).catch(err => res.status(500).send({ err }))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.tema) return res.status(404).send({ message: 'Not Found' });
    let tema = req.body.tema;
    return res.status(200).send({ tema });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.tema) return res.status(404).send({ message: 'Not Found' });
    let tema = req.body.tema[0];
    tema = Object.assign(tema, req.body);
    tema.save()
        .then(tema => res.status(200).send({ message: 'Producto Updated', tema })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.tema) return res.status(404).send({ message: 'Not Found' });
    req.body.tema[0].remove()
        .then(tema => {
            res.status(200).send({ message: 'Producto removed', tema })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Tema.find(query).then(tema => {
        if (!tema.length) return next();
        req.body.tema = tema;
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
