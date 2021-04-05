const _ = require('lodash');
const { Role, validate } = require('./model');
const express = require('express');
const asyncMiddleware = require('../middleware/async')

module.exports = {
    find: asyncMiddleware(async function(req, res) {

        const roles = await Role.find();
        res.send(roles);

    }),
    findById: asyncMiddleware(async(req, res) => {
        const roles = await Role.findById(req.params.id);
        res.send(roles);
    }),
    create: asyncMiddleware(async(req, res) => {

        //  const { error } = validate(req.body);
        //  if (error) return res.status(400).send(error.details[0].message);

        let role = new Role({
            name: req.body.name,
        });

        role = await role.save();

        res.send(role)

    }),
    update: asyncMiddleware(async(req, res) => {

        // const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        const role = await Role.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
        });
        if (!role) return res.status(404).send('The role  with the given ID was not found.');
        res.send(role);

    }),
    delete: asyncMiddleware(async(req, res) => {

        const role = await Role.findByIdAndRemove(req.params.id);

        if (!role) return res.status(404).send('The role  with the given ID was not found.');

        res.send(role);

    })
}