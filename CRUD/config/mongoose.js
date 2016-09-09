'use strict';

const config = require('./config.js'),
    mongoose = require('mongoose');

module.exports = function () {
    
    mongoose.connect(config.db_uri);
    
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('Conectado a: '+config.db_uri);
    });
    
    require('../app/models/users.server.model.js');
    require('../app/models/articles.server.model.js');
    
    return db;
};