const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

function validate(type) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
    });
    return schema.validate(type);
}
const Type = mongoose.model('Type', typeSchema);
exports.type = typeSchema;
exports.Type = Type;
exports.validate = validate;