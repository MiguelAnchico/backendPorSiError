const Problema = require('../models/Problema');
const mongoose = require('mongoose');


function listall(req, res) {
    Problema.find({})
        .then(problema => {
            return res.json( [problema] );

        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let problema = new Problema(req.body);
    problema._id = mongoose.Types.ObjectId();
    problema.save()
        .then(problema =>
            res.status(201).send("success")
        ).catch(err => res.status(500).send({ err }))
}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.problema) return res.status(404).send({ message: 'Not Found' });
    let problema = req.body.problema;
    return res.status(200).send({ problema });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.problema) return res.status(404).send({ message: 'Not Found' });
    let problema = req.body.problema[0];
    problema = Object.assign(problema, req.body);
    problema.save()
        .then(problema => res.status(200).send({ message: 'Producto Updated', problema })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.problema) return res.status(404).send({ message: 'Not Found' });
    req.body.problema[0].remove()
        .then(problema => {
            res.status(200).send({ message: 'Producto removed', problema })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Problema.find(query).then(problema => {
        if (!problema.length) return next();
        req.body.problema = problema;
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
