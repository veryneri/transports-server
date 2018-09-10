'use strict';

var models = require('../models');
var fixtures = require('./index');
var customAPIError = require('../errors').customAPIError;

module.exports = function() {
  Object.keys(fixtures).forEach(function(model) {
    fixtures[model].forEach(function(doc) {
      var newDoc = new models[model](doc);
      newDoc.save(function(err) {
        if (err) {
          if (err.code === 11000) {
            err = customAPIError('DuplicateError',
              'Duplicate fixture: ' + doc._id || null,
              400);
          }
          throw err;
        }
      });
    });
  });
};
