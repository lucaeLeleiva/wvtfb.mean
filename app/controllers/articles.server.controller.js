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
        title: req.article.title,
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

exports.addComment = (req, res, next)=>{
    Article.findByIdAndUpdate(
        req.article._id,
        {$push: {"comments": {comment: req.body.comment, posterId: req.user._id, posterName: req.user.username, }}},
        {safe: true, upsert: true, new : true},
        (err, query)=>{
            if(err){
                return next(err);
            }
    });
    const newArticle = {
        comment: req.body.comment,
        posterId: req.user._id,
        posterName: req.user.username,
    };
    req.article.comments.push(newArticle);
    res.json(req.article.comments);
};

exports.upVote = (req, res, next)=>{
    let alreadyVote = false;
    for(let i = 0; i < req.article.voter.length; i++){
        if(req.article.voter[i].voterId === req.user._id){
            alreadyVote = true;
        }
    }
    if(!alreadyVote){
        let points;
        if(!req.article.points){
            points = 1;
        }else{
            points = ++req.article.points;
        }
        Article.findByIdAndUpdate(
            req.article._id,
            {
                points: points,
                $push: {"voter": { voterId: req.user._id, voterName: req.user.username,},},
            },
            {safe: true, upsert: true, new : true},
            (err, query)=>{
                if(err){
                    return next(err);
                }
            res.json(req.article.points);
        }); 
    }
};

exports.downVote = (req, res, next)=>{
    let points;
    if(!req.article.points){
        points = -1;
    }else{
        points = --req.article.points;
    }
    Article.findByIdAndUpdate(
        req.article._id,
        {points: points},
        {safe: true, upsert: true, new : true},
        (err, query)=>{
            if(err){
                return next(err);
            }
        res.json(req.article.points);
    });
};

exports.renderPostMenu = (req, res, next)=>{
    if (req.user) {
        res.render('index', {
            title: 'Post',
            content: 'post',
            messages: req.flash('error') || req.flash('info'),
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
    }else{
        res.redirect('/');    
    }
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