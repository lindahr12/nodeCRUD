const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const categorieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    categorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    },
});

function validatecat(categorie) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        description: Joi.string().min(4).required(),
    });
    return schema.validate(categorie);

}

const Categorie = mongoose.model('Categorie', categorieSchema);

exports.categorie = categorieSchema;
exports.Categorie = Categorie;
exports.validate = validatecat;