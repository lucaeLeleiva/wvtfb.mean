'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = ()=>{
    const app = express();
    
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'CookieMonster',
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/users.server.route.js')(app);
    require('../app/routes/articles.server.route.js')(app);
    
    return app;
};