'use strict';

//Importo mongoose y la funcion de esquemas.
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Creo un nuevo esquema para usuarios.
const user = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        trim: true
    },
    articles: {},
});

//Agrego el esquema a mongoose
mongoose.model('User', user);