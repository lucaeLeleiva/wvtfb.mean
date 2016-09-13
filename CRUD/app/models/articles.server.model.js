'use strict';

//Importo mongoose y la funcion de esquemas.
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//Creo un nuevo esquema para los articulos.
const article = new Schema({
    title:{
        type: String,
        trim: true,
        require: true,
    },
    img:{
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    description:{
        type: String,
        trim: true,
    },
    points:{
        //TODO agregar funcion que lleve el control de puntos
    },
    OP:{
        //Recibe el id del usuario cuando se hace el post
    },
});

//Agrego el esquema a mongoose
mongoose.model('Article', article);