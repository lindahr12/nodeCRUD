const _ = require('lodash');
const { Categorie, validate } = require('./model');
const express = require('express');
const asyncMiddleware = require('../middleware/async')

module.exports = {
    find: asyncMiddleware(async function(req, res) {

        const categories = await Categorie.find().populate('categorie');
        res.send(categories);

    }),
    findById: asyncMiddleware(async(req, res) => {
        const categorie = await Categorie.findById(req.params.id).populate('categorie');
        res.send(categorie);

    }),
    create: asyncMiddleware(async(req, res) => {

        //const { error } = validate(req.body);
        //if (error) return res.status(400).send(error.details[0].message);
        let categorie = new Categorie({
            name: req.body.name,
            description: req.body.description,
            categorie: req.body.categorie
        });

        categorie = await categorie.save();

        res.send(categorie)

    }),
    update: asyncMiddleware(async(req, res) => {

        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const categorie = await Categorie.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        });
        if (!categorie) return res.status(404).send('The categorie  with the given ID was not found.');
        res.send(categorie);

    }),
    delete: asyncMiddleware(async(req, res) => {

        const categorie = await Categorie.findByIdAndRemove(req.params.id);
        if (!categorie) return res.status(404).send('The categorie  with the given ID was not found.');
        res.send(categorie);

    })
}