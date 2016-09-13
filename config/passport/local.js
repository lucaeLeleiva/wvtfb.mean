const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = ()=>{
    passport.use('local', new LocalStrategy({
                    passReqToCallback : true
                },(req, username, password, done)=>{
                User.findOne({username: username}, (err, user)=>{
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Unknown user'});
                }
                if (!user.authenticate(user.password, password)) {
                    return done(null, false, {message: 'Invalid password'});
                }
                return done(null, user);
            }
        );
    }));
};