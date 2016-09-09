'use strict';

const Article = require('mongoose').model('Article');

exports.create = (req, res, next)=>{
    const article = new Article(req.body);
    article.save( (err)=>{
        if(err){
            console.log(err);
        }
        res.json(article);
    });
};

exports.getAll = ((req,res)=>{
    Article.find({}, (err, articles)=>{
        if(err){
            console.log(err);
        }
        res.json(articles);
    });
});

/*
TODO
exports.getOne = 
exports.delete =
exports.update;*/