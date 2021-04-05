const _ = require('lodash');
const { Annonce } = require('./model');
const express = require('express');
const asyncMiddleware = require('../middleware/async')
var app = express();

module.exports = {
    find: asyncMiddleware(async function(req, res) {

        const annonce = await Annonce.find();
        res.send(annonce);

    }),

    findById: asyncMiddleware(async(req, res) => {
        const annonce = await Annonce.findById(req.params.id);
        res.send(annonce);
    }),
    create: asyncMiddleware(async(req, res) => {
        console.log(req.files.file)
        let annonce = new Annonce({
            title: req.body.title,
            isActive: req.body.isActive,
            description: req.body.description,
            categorie: req.body.categorie,
            type: req.body.type,
            file: req.files.file,
            image: req.files.image

        });
        annonce = await annonce.save();
        res.send(annonce)



    }),
    update: asyncMiddleware(async(req, res) => {
        const annonce = await Annonce.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            isActive: req.body.isActive,
            description: req.body.description,
            categorie: req.body.categorie,
            type: req.body.type,
            file: req.files.file,
            image: req.files.image

        });
        if (!annonce) return res.status(404).send('The annonce  with the given ID was not found.');
        res.send(annonce);

    }),
    delete: asyncMiddleware(async(req, res) => {

        const annonce = await Annonce.findByIdAndRemove(req.params.id);

        if (!annonce) return res.status(404).send('The annonce  with the given ID was not found.');

        res.send(annonce);

    })
}