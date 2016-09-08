'use strict';

exports.get = ('/user',(req,res)=>{
   res.render('user.ejs'); 
});

exports.post = ('/user',(req,res)=>{
   console.log('post recibido');
});