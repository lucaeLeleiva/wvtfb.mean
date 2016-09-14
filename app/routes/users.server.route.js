'use strict';

module.exports = (app)=>{
    const user = require('../controllers/users.server.controller.js'),
        passport = require('passport');
    
    app.route('/user/:userId')
        .get(user.getUser)
        .post(user.update)//Se debe actualizar a put
        .delete(user.delete);//Admitido en control api pero no hay forma de hacerlo desde la pagina
    
    //al pedo?    
    app.route('/users')
        .post(user.create);
    
    app.route('/register')
        .get(user.renderRegister)
        .post(user.register);
        
    app.route('/login')
        .get(user.renderLogin)
        .post(passport.authenticate('local', {
            failureFlash: true,
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