'use strict';

//Importo las librerias configuradas
const express = require('./config/express.js'),
    config = require('./config/config.js'),
    mongoose = require('./config/mongoose.js'),
    db = mongoose(),
    app = express();

app.listen(config.port, () => {
    console.log("Live.");
});

module.exports = app;