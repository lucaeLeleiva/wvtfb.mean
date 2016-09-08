'use strict';

exports.get = ('/article',(req,res)=>{
   res.render('article.ejs'); 
});

exports.post = ('/article',(req,res)=>{
   console.log('post recibido');
});