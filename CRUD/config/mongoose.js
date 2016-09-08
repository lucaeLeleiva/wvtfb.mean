'use strict';

const config = require('./config.js'),
    mongoose = require('mongoose');

module.exports = function () {
    const db = mongoose.connect(config.db_uri);
    
    require('../app/models/users.server.model.js');
    require('../app/models/articles.server.model.js');
    
    return db;
};