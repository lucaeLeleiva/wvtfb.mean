'use strict';

const Article = require('mongoose').model('Article');

exports.create = (req, res, next)=>{
    const article = new Article(req.body);
    article.save( (err)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/articles');
    });
};

exports.getAll = (req, res)=>{
    Article.find({}, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.render('index.ejs',{
            title: 'Articles',
            content: 'articles',
            articles: query,
            messages: req.messages ? req.messages : '',
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
    });
};

exports.getArticle = (req, res)=>{
    res.render('index.ejs',{
        title: 'Article',
        content: 'article',
        articles: req.article,
        messages: req.messages ? req.messages : '',
        user: req.user ? req.user.username : '',
        id: req.user ? req.user._id : '',
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

exports.getUser_s = (req, res)=>{
    Article.find({OP: req.user._id.toString()}, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.render('index.ejs',{
            title: 'Articles',
            content: 'articles',
            articles: query,
            messages: req.messages ? req.messages : '',
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
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