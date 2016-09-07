'use strict';

module.exports = (app)=>{
    const user = require('../controllers/users.server.controller.js');
    app.get('/user', user.get);
    app.post('/user', user.post);
};