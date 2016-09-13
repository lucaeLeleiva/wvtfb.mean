'use strict';

module.exports = (app)=>{
    const article = require('../controllers/articles.server.controller.js');
    
    app.route('/article/:articleId')
        .get(article.getArticle)
        .delete(article.delete)
        .put(article.update);
    app.route('/articles')
        .post(article.create)
        .get(article.getAll);
    
    app.param('articleId', article.getById);
};