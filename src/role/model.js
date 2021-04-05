const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../user/model')
dotenv.config();
const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
});

function validateRole(role) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        droit: Joi.object({
            nom: Joi.string().required()
        }).optional()
    });
    return schema.validate(role);

}

const Role = mongoose.model('Role', roleSchema);

exports.roleSchema = roleSchema;
exports.Role = Role;
exports.validate = validateRole;