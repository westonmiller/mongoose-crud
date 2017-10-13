# mongoose-crud
Enable all CRUD(Create, Read, Update, and Delete) endpoints with this express middleware. 

## Features
- Creates endpoints for `Get` `Post`, `Update`, and `Delete`
- Enables query strings for `Get`

## Install
```
$ npm install mongoose-crud --save
```

## API
```javascript
import Crud from 'mongoose-express-crud';
```

### new Crud(**Mongoose Model**, options);
```javacript
const crud = new Crud(MongooseModel, options(optional));
```
#### Options
```javascript
{
  exludes: ['password'] //array of properies, that won't be returned from the model
}
```

## Example
```javascript
import Crud from 'mongoose-express-crud';
import express from 'express';
import User from './models/User'; //Model for endpoints

const crud = new Crud(User);

const app = express();

app.use('/users', crud.routes)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
```
*note:* If using `require()` you must add `.default` 
```
var Crud = require('mongoose-crud').default
```


