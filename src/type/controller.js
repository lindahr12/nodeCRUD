const _ = require('lodash');
const { Type, validate } = require('./model');
const express = require('express');
const asyncMiddleware = require('../middleware/async')

module.exports = {
    find: asyncMiddleware(async function(req, res) {

        const type = await Type.find();
        res.send(type);

    }),
    findById: asyncMiddleware(async(req, res) => {
        const type = await Type.findById(req.params.id);
        res.send(type);

    }),
    create: asyncMiddleware(async(req, res) => {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let type = new Type({
            name: req.body.name,
        });

        type = await type.save();

        res.send(type)

    }),
    update: asyncMiddleware(async(req, res) => {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const type = await Type.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        });
        if (!type) return res.status(404).send('The Type with the given ID was not found.');
        res.send(type);

    }),
    delete: asyncMiddleware(async(req, res) => {

        const type = await Type.findByIdAndRemove(req.params.id);
        if (!type) return res.status(404).send('The Type  with the given ID was not found.');
        res.send(type);

    })
}