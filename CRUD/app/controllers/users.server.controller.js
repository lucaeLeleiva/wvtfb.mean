'use strict';

const User = require('mongoose').model('User');

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
    res.json(req.user);
};

exports.update = (req, res)=>{
    User.findByIdAndUpdate(req.user._id, req.user, (err, query)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/user/:'+req.user._id);
    });
};

exports.delete = (req, res)=>{
    User.findByIdAndRemove(req.user._id, (err, query)=>{
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