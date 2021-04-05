const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { decodeBase64 } = require('bcryptjs');
dotenv.config();

module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) return res.status(401).send('access denied no token provided');
    try {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        token = bearerToken;
        const decoded = jwt.verify(token, process.env.jwtPrivateKey)
        req.user = decoded;
        //console.log("role", req.user)
        console.dir(req.user, { depth: null })
        next();
    } catch (ex) {
        res.status(400).send('invalid token ');
    }
}