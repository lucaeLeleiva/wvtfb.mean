'use strict';

const User = require('mongoose').model('User');

exports.create = (req, res, next)=>{
   const user = new User(req.body);
   user.save( (err)=>{
      if(err){
         console.log(err);
      }
      res.json(user);
   });
};

/*exports.getAll = ((req,res)=>{
   User.find({}, (err, users)=>{
      if(err){
         console.log(err);
      }
      res.json(users);
   });
});*/

/*exports.get = ('/user',(req,res)=>{
   res.render('user.ejs'); 
});*/

/*exports.post = ('/user',(req,res)=>{
   console.log('post recibido');
});*/