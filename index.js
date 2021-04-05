const mongoose = require('mongoose');
const users = require('./src/user');
const role = require('./src/role');
const type = require('./src/type');
const annonce = require('./src/annonce');
const categorie = require('./src/categorie');
const express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer');
const err = require('./src/middleware/error')
const helmet = require('helmet')
const path = require('path');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
var cors = require('cors')

app.use(cors())

if (!process.env.jwtPrivateKey) {
    console.error('FATAL ERROR jwt don t defined');
    process.exit(1);
}
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect("mongodb://" + process.env.DATABASE + "/" + process.env.DATABASE_NAME, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use(helmet())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', users);
app.use('/api/role', role);
app.use('/api/type', type)
app.use('/api/categorie', categorie)
app.use('/api/annonce', annonce);
app.use('/images', express.static(path.join(__dirname, 'images')));
//app.use(err)
require('dotenv').config();
//upload files with multer
//upload files with multer


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));