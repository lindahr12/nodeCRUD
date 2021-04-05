const Joi = require('joi')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, validate } = require('./model');
const express = require('express');
const router = express.Router();
const asyncMiddleware = require('../middleware/async');

module.exports = {

    login: asyncMiddleware(async(req, res) => {
        // const { error } = validate(req.body);
        // if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email }).populate('role')
        if (!user) return res.status(400).send('Invalid email or password ')
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send('Invalid email or password ')
        const token = user.generateAuthToken(user);
        res.send(token);
    }),
    currentUser: asyncMiddleware(async(req, res) => {

        const bearerHeader = req.headers['authorization'];
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        token = bearerToken;
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decoded;
        //console.log("role", req.user)
        console.dir(req.user, { depth: null })
        console.log(decoded.user._id)
        res.send(req.user);

    }),




}