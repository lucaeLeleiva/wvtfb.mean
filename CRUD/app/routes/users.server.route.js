'use strict';

module.exports = (app)=>{
    const user = require('../controllers/users.server.controller.js');
    app.post('/user', user.create);
    
    /*
    TODO manejar los gets de user y los demas post
    app.get('/user', user.);
    */
};