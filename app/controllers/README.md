## Controllers
- The controllers consists of a bunch of methods to export and atach later to an auxiliar variable.

### Model:

```javascript
exports.NameOfMethod = (parameters)=>{
    //Does something (usually with the request)
    //Returns something with the use of the response
};
```

### Example:

```javascript
exports.create = (req, res, next)=>{
    const article = new Article(req.body);
    article.save( (err)=>{
        if(err){
            return console.log(err);
        }
        res.redirect('/articles');
    });
};
```