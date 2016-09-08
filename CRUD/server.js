'use strict';

//Importo las librerias configuradas
const express = require('./config/express.js'),
    mongoose = require('./config/mongoose.js'),
    config = require('./config/config.js'),
    app = express(),
    db = mongoose();

app.listen(config.port, () => {
    console.log("Live.");
});

module.exports = app;