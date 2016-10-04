'use strict';

module.exports = (app)=>{
    const article = require('../controllers/articles.server.controller.js'),
        user = require('../controllers/users.server.controller.js');
    
    app.route('/article/:articleId')
        .get(article.getArticle)
        .delete(article.delete)//No se controlan metodos put y delete aun
        .put(article.update);//--------------------^--------------------/
    app.route('/articles')
        .get(article.getAll);
    app.route('/articles/:userId')
        .get(article.getUser_s);
    app.route('/addComment/:articleId/:userId')
        .post(article.addComment);
    app.route('/upVote/:articleId/')
        .post(article.upVote);
    app.route('/downVote/:articleId')
        .post(article.downVote);
    app.route('/post')
        .post(article.create)
        .get(article.renderPostMenu);
    
    
    app.param('userId', user.getById);
    app.param('articleId', article.getById);
};