const Joi = require('joi')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')
const { User, validate } = require('./model');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');
const { Role } = require('../role/model');
const { Permission } = require('../role/permission');

module.exports = {

    find: asyncMiddleware(async function(req, res) {
        const users = await User.find().populate('role');
        res.send(users);
    }),
    findById: asyncMiddleware(async(req, res) => {

        const user = await (await User.findById(req.params.id).populate('role').select('-password'));
        if (!user) return res.status(404).send('The user  with the given ID was not found.');
        res.send(user);
    }),
    create: asyncMiddleware(async(req, res) => {
        //const { error } = validate(req.body);
        //if (error) return res.status(400).send(error.details[0].message);
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            matriculeFiscal: req.body.matriculeFiscal,
            telephone: req.body.telephone,
            ville: req.body.ville,
            rue: req.body.rue,
            codePostal: req.body.codePostal,
            nomDiffusion: req.body.nomDiffusion,
            description: req.body.description,
            website: req.body.website

        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        console.log(req.body.role);
        console.log('id', user._id)
        const role = await Role.findByIdAndUpdate(
            req.body.role, { $push: { user: user._id } }, { new: true, useFindAndModify: false }
        );
        let permission = new Permission({
            permission: req.body.permission,
            role: user.role,
            user: user
        })
        console.log(permission)
        permission = await permission.save()
            //console.log("push", role)
        const token = user.generateAuthToken();
        //res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
        res.send(user)
    }),
    update: asyncMiddleware(async(req, res) => {
        //const { error } = validate(req.body);
        //if (error) return res.status(400).send(error.details[0].message);
        var pass = await bcrypt.hash(req.body.password, 10);
        const user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: pass,
            role: req.body.role,
            matriculeFiscal: req.body.matriculeFiscal,
            telephone: req.body.telephone,
            ville: req.body.ville,
            rue: req.body.rue,
            codePostal: req.body.codePostal,
            nomDiffusion: req.body.nomDiffusion,
            description: req.body.description,
            website: req.body.website
        });
        if (!user) return res.status(404).send('The user  with the given ID was not found.');
        res.send(user);
    }),
    delete: asyncMiddleware(async(req, res) => {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(404).send('The user  with the given ID was not found.');

        res.send(user);
    }),

    permission: asyncMiddleware(async(req, res) => {
        const user = await User.findByIdAndRemove(req.params.id);

        if (!user) return res.status(404).send('The user  with the given ID was not found.');

        res.send(user);
    })


}