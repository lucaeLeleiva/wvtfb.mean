## Routes
- Routes are methods that receive a url as a parameter and assigns a function accordingly to the post and/or get method and later exported to the express config file.

### Model:

```javascript
module.exports = (app)=>{
    const controllerName = require(controllerPath);
    
    app.route('/url/inner_url').get(controllerName.controllerMethod1).post(controllerName.controllerMethod2);
    app.route('/url').get(controllerName.controllerMethod1).post(controllerName.controllerMethod3);
    app.route('/url/:url_as_parameter').get(controllerName.controllerMethod4).post(controllerName.controllerMethod2);
    
    //Note that the preControllerMethod1 will be executed before any other method if the url have a url parameter (marked with the colon ':')
    app.param('url_as_parameter', controllerName.preControllerMethod1);
}
```
### Example:

```javascript
'use strict';

module.exports = (app)=>{
    const article = require('../controllers/articles.server.controller.js'),
        user = require('../controllers/users.server.controller.js');
    
    app.route('/article/:articleId')
        .get(article.getArticle)
    app.route('/articles')
        .get(article.getAll);
    app.route('/articles/:userId')
        .get(article.getUser_s);
    app.route('/addComment/:articleId/:userId')
        .post(article.addComment);
    app.route('/upVote/:articleId')
        .post(article.upVote);
    app.route('/downVote/:articleId')
        .post(article.downVote);
    app.route('/post')
        .post(article.create)
        .get(article.renderPostMenu);
    
    
    app.param('userId', user.getById);
    app.param('articleId', article.getById);
};
```