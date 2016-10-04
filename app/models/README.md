## Models
- Models rule the structure of a document in the database

### Steps:

- Import the mongoose package
- Import from the mongoose package the Schema library
- Create a new Schema as a Json
- Add the Schema to mongoose

### Model:

```javascript
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
    const schemaName = new Schema({
        var1: type,
        var2: {
            type: Type,
            unique: bool,
            required: bool,
        },
    });
    
    mongoose.model('CallNameOfTheSchema', schemaName);
```

### Example:

```javascript
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const article = new Schema({
    title: {
        type: String,
        trim: true,
        require: true,
    },
    img: {
        type: String,
        trim: true,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    points: {
        type: Number,
    },
    comments: [{
        comment: {
            type: String,
        },
        poster: {
            type: String,
        },
    }]
});

mongoose.model('Article', article);
```