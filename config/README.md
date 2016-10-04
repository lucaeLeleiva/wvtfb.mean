## Here lies the config files

- The objective of the files in this folder is to personalize or configure the existing packages according to our need, to later be used in other files insted of the packaged ones.

###Model:

```javascript
//Import the original
const packageToConfig = require('OriginalPackage'),
//Import complementary packages
    complementary1 = require('PackageToUse1'),
    complementary2 = require('PackageToUse2');

//Create a function to export
module.exports = ()=>{
    //Asign the executed package to a variable
    const executedPackage = packageToConfig();
    
    //Attach the complementary packages
    executedPackage.use(complementary1);
    executedPackage.use(complementary2);
    
    //Set diferent atributtes
    executedPackage.set('Some atributte', 'To this value');
    
    //Use it
    require('FileWhichAssignAValueToTheExecutedPackage')(executedPackage);
    
    //Return it to export
    return executedPackage;
};
```

###Example:

```javascript
'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');


module.exports = ()=>{
    const app = express();
    
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'CookieMonster',
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    
    require('../app/routes/index.server.route.js')(app);
    require('../app/routes/users.server.route.js')(app);
    require('../app/routes/articles.server.route.js')(app);
    
    return app;
};
```