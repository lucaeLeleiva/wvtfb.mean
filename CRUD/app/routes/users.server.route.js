'use strict';

module.exports = (app)=>{
    const user = require('../controllers/users.server.controller.js'),
        passport = require('passport');
    
    app.route('/user/:userId')
        .get(user.getUser)
        .put(user.update)
        .delete(user.delete);
        
    app.route('/users')
        .post(user.create);
    
    app.route('/register')
        .get(user.renderRegister)
        .post(user.register);
        
    app.route('/login')
        .get(user.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
        }));
        
    app.route('/logout')
        .get(user.logout);
    
    app.param('userId', user.getById);
    
    /*
    TODO manejar el get generico? 
        Limitar el get de usuario
        agregar otras propiedades
    */
};