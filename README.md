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
import Crud from 'mongoose-crud';
```

### new Crud(**Mongoose Model**);
```javacript
const crud = new Crud(MongooseModel);
```

## Example
```javascript
import Crud from 'mongoose-crud';
import express from 'express';
import User from './models/User'; //Model for endpoints

const crud = new Crud(User);

const app = express();

app.use('/users', crud.start)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
});
```
