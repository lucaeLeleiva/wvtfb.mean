var express=require('express'),
    mongoose=require('mongoose'),
    config=require('./config/config.js'),
    app=express();

app.listen(config.port,()=>{
        console.log("Live.");
    }
);
