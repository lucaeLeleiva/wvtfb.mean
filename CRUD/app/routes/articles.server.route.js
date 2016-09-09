'use strict';

module.exports = (app)=>{
    const article = require('../controllers/articles.server.controller.js');
    app.get('/article', article.getAll);
    app.post('/article', article.create);
};