const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const annonceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    isActive: {
        type: Boolean,
        default: 'true',

    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 50
    },
    categorie: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorie"
    }],
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Type"
    }],
    file: [{
        type: Object
    }],
    image: [{
        type: Object
    }]

});



const Annonce = mongoose.model('Annonce', annonceSchema);

exports.annonceSchema = annonceSchema;
exports.Annonce = Annonce;