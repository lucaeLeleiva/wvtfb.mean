'use strict';

const User = require('mongoose').model('User'),
    passport = require('passport');

const getErrorMessage = (err)=>{
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (let errName in err.errors) {
            if (err.errors[errName].message){
                message = err.errors[errName].message;
            }
        }
    }
    return message;
};

exports.create = (req, res, next)=>{
   const user = new User(req.body);
   user.save( (err)=>{
      if(err){
         return console.log(err);
      }
      res.json(user);
   });
};

exports.getUser = (req, res)=>{
    if (req.user) {
        res.render('index', {
            title: req.user.username,
            content: 'user',
            messages: req.flash('error') || req.flash('info'),
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
    }else{
        res.redirect('/');    
    }
};

exports.update = (req, res, next)=>{
    User.findByIdAndUpdate(req.user._id, {$set:req.body}, (err, user)=>{
        if(err){
            return next(err);
        }
        res.redirect('/user/:'+req.user._id);
    });
};

exports.delete = (req, res)=>{
    User.findByIdAndRemove(req.user._id, (err)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/');
    });
};

exports.getById = (req, res, next, id)=>{
   User.findOne({_id: id,}, (err, user)=>{
      if(err){
         return next(err);
      }
      req.user = user;
      next();
   });
};

exports.renderLogin = (req, res, next)=>{
    if (!req.user) {
        res.render('index', {
            title: 'Login',
            content: 'login',
            messages: req.flash('error') || req.flash('info'),
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
    }else{
        res.redirect('/');    
    }
};

exports.renderRegister = (req, res, next)=>{
    if (!req.user) {
        res.render('index', {
            title: 'Register',
            content: 'register',
            messages: req.flash('error'),
            user: req.user ? req.user.username : '',
            id: req.user ? req.user._id : '',
        });
    }else{
        res.redirect('/');
    }
};

exports.register = (req, res, next)=>{
    if (!req.user) {
        const user = new User(req.body);
        user.provider = 'local';
        user.save((err)=>{
            if (err) {
                const message = getErrorMessage(err);
                req.flash('error', message);
                console.log(err);
                return res.redirect('/register');
            }
            req.login(user, (err)=>{
                if (err){
                    return next(err);
                }
                return res.redirect('/');
            });
        });
    }else{
        return res.redirect('/');
    }
};

exports.logout = (req, res)=>{
    req.logout();
    res.redirect('/');
};