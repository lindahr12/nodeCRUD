const Joi = require('joi');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../user/model')
const Role = require('./permission')
dotenv.config();
const permissionSchema = new mongoose.Schema({
    permission: [{
        type: String,
        default: 'get',
        enum: ["all", "get", "update", "delete", "create"]
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    role: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
});



const Permission = mongoose.model('Permission', permissionSchema);
exports.permissionSchema = permissionSchema;
exports.Permission = Permission;