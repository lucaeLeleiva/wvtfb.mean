'use strict';

exports.get = (req,res)=>{
    res.render('index.ejs',{
        title: 'Inicio',
        content: '',
    }); 
};