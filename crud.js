import express, { Router } from 'express';
import bodyParser from 'body-parser';
import MongoQS from 'mongo-querystring';

class Crud {
  constructor(model, options) {
    this.model = model;
    this.options = options;

    this.router = Router();
    this.queryString = new MongoQS();
    this.routes = this.router;

    this.router.use(bodyParser.json())

    this._setupGet();
    this._setupPost();
    this._setupUpdate();
    this._setupDelete();
  }

  _setupGet() {
    this.router.get('/', (request, response) => {
      const query = this.queryString.parse(request.query);
      const excludes = this._excludes();
      this.model.find(query, excludes, (error, items) => { this._respond(response, error, items, 200)});
    });

    this.router.get('/:id', (request, response) => {
      const excludes = this._excludes();
      this.model.findById(request.params.id, excludes, ((error, item) => { this._respond(response, error, item, 200)}));
    });
  }

  _setupPost() {
    this.router.post('/', (request, response) => {
      const item = new this.model(request.body);
      item.save((error, newItem) => { 
        let newEditedItem = this._removeExcludedPropertiesFrom(newItem);
        this._respond(response, error, newEditedItem, 201);
      });
    });
  }

  _setupUpdate() {
    this.router.put('/:id', (request, response) => {
      this.model.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true},
        (error, updatedItem) => {
          let editedItem = this._removeExcludedPropertiesFrom(updatedItem);
          this._respond(response, error, editedItem, 200);
        });
    });

    this.router.patch('/:id', (request, response) => {
      this.model.findByIdAndUpdate(
        request.params.id,
        request.body,
        {new: true},
        (error, updatedItem) => {
          let editedItem = this._removeExcludedPropertiesFrom(updatedItem);
          this._respond(response, error, editedItem, 200);
        });
    });
  }

  _setupDelete() {
    this.router.delete('/:id', (request, response) => {
      this.model.findByIdAndRemove(request.params.id, (error) => {
        this._respond(response, error, {}, 200);
      });
    });
  }

  _respond(response, error, responseItem, goodStatusCode) {
    if (error) {
      return response.status(500).send({error});
    } else {
      return response.status(goodStatusCode).send(responseItem);
    }
  }

  _excludes() {
    let excludes = {}
    if (this.options && this.options.exclude) {
      this.options.exclude.forEach((excludeString) => {
        excludes[excludeString] = 0;
      });
    }
    return excludes
  }

  _removeExcludedPropertiesFrom(item) {
    let newItem = item.toJSON()
    for (let excludedProperty of this.options.exclude) {          
      delete newItem[excludedProperty];
    }

    return newItem
  }
}

export default Crud
