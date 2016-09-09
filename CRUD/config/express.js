'use strict';

const express = require('express'),
    bodyParser = require('body-parser');

module.exports = function (){
    const app = express();
    
    app.use(bodyParser.urlencoded({
            extended: true,
        }));
    app.use(bodyParser.json());
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/users.server.route.js')(app);
    require('../app/routes/articles.server.route.js')(app);
    
    return app;
};