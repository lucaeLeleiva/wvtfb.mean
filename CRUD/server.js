'use strict';

//Importo las librerias configuradas
const express = require('./config/express.js'),
    config = require('./config/config.js'),
    mongoose = require('./config/mongoose.js'),
    passport = require('./config/passport'),
    db = mongoose(),
    _passport = passport(),
    app = express();

app.listen(config.port, () => {
    console.log("Pagina live.");
});

module.exports = app;