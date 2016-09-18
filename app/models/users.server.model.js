'use strict';

//TODO agregar funcionalidad de encriptado

//Importo mongoose y la funcion de esquemas.
const mongoose = require('mongoose'),
    //crypto = require('crypto'),
    Schema = mongoose.Schema;

//Creo un nuevo esquema para usuarios.
const user = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
    },
    articles: {
        //TODO agregar union con articulo
    },
});

/*user.pre('save', (next)=>{
        if (this.password) {
            const md5 = crypto.createHash('md5');
            this.password = md5.update(this.password).digest('hex');
        }
        next();
    }
);*/

//TODO reever el uso de this y el encriptado
user.methods.authenticate = (userPass, password)=>{
    //var md5 = crypto.createHash('md5');
    //md5 = md5.update(password).digest('hex');

    return userPass === password;
};

user.statics.findUniqueUsername = (username, suffix, callback)=>{
    const _this = this,
        possibleUsername = username + (suffix || '');

    _this.findOne({username: possibleUsername}, (err, user)=>{
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            }else{
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }else{
            callback(null);
        }
    });
};

//Agrego el esquema a mongoose
mongoose.model('User', user);