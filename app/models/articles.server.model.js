'use strict';

//Importo mongoose y la funcion de esquemas.
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Creo un nuevo esquema para los articulos.
const article = new Schema({
    title: {
        type: String,
        trim: true,
        require: true,
    },
    img: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    points: {
        type: Number,
    },
    voter: [{
        voterId: {
            type: String,
        },
        voterName: {
            type: String,
        },
    }],
    OP: {
        //Recibe el id del usuario cuando se hace el post
    },
    comments: [{
        comment: {
            type: String,
        },
        posterId: {
            type: String,
        },
        posterName: {
            type: String,
        },
        
    }]
});

//Agrego el esquema a mongoose
mongoose.model('Article', article);