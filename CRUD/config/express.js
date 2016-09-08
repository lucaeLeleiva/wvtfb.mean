'use strict';

const express = require('express');

module.exports = function (){
    const app = express();
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/users.server.route.js')(app);
    require('../app/routes/articles.server.route.j')(app);
    
    return app;
};