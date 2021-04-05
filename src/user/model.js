const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1025,

    },
        created_at: {
        type: Date,
        default: Date.now
    },
    matriculeFiscal: {
        type: String,
        minlength: 4,
        maxlength: 1025,
    },
    telephone: {
        type: Number,
    },
    ville: {
        type: String,

    },
    rue: {
        type: String,
        minlength: 5,
        maxlength: 1025,
    },
    codePostal: {
        type: Number,
        minlength: 5,
        maxlength: 1025,
    },
    nomDiffusion: {
        type: String,
        minlength: 2,
        maxlength: 1025,
    },
    description: {
        type: String,
        minlength: 2
    },
    role: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }],
    website: {
        type: String,
        minlength: 2,
        maxlength: 1025
    }


});

userSchema.methods.generateAuthToken = function(res) {
    const token = jwt.sign({ user: res }, process.env.jwtPrivateKey)
    return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().min(6).required().email(),
        password: Joi.string().min(6).required(),

    });

    return schema.validate(user);

}


exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;