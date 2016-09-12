const passport = require('passport'),
    mongoose = require('mongoose');

module.exports = ()=>{
    const User = mongoose.model('User');
    
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findOne({_id: id}, '-password', (err, user)=>{
                done(err, user);
            }
        );
    });
    
    require('./passport/local.js')();
};