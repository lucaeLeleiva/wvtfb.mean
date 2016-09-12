'use strict';

const Article = require('mongoose').model('Article');

exports.create = (req, res, next)=>{
    const article = new Article(req.body);
    article.save( (err)=>{
        if(err){
            return console.log(err);
        }
        res.json(article);
    });
};

exports.getAll = (req, res)=>{
    Article.find({}, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.render('index.ejs',{
            title: 'Articles',
            content: 'article',
            articles: query,
        });
    });
};

exports.getArticle = (req, res)=>{
    const article = [req.article];
    res.render('index.ejs',{
        title: 'Article',
        content: 'article',
        articles: article,
    });
};

exports.update = (req, res)=>{
    Article.findByIdAndUpdate(req.article._id, req.article, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/articles');
    });
};

exports.delete = (req, res)=>{
    Article.findByIdAndRemove(req.article._id, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/articles');
    });
};

exports.getById = (req, res, next, id)=>{
    Article.findOne({
        _id: id,
    }, (err, article)=>{
        if(err){
            return next(err);
        }
        req.article = article;
        next();
    });
};



