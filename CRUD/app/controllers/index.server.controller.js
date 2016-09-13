'use strict';

exports.get = (req,res)=>{
    res.render('index.ejs',{
        title: 'Inicio',
        content: '',
        messages: req.messages ? req.messages : '',
        user: req.user ? req.user.username : '',
        id: req.user ? req.user._id : '',
    }); 
};