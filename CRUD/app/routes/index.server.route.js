'use strict';

module.exports = (app)=>{
    const index = require('../controllers/index.server.controller.js');
    app.get('/', index.get);
};