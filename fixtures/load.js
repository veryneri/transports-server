'use strict';

var models = require('../models');
var fixtures = require('./index');
var customAPIError = require('../errors').customAPIError;

async function load() {
  var fixturesKeys = Object.keys(fixtures);
  var fixturesKeysLength = fixturesKeys.length;

  for (var i = 0; i < fixturesKeysLength; i++) {
    var model = fixturesKeys[i];
    var modelFixtures = fixtures[model];
    var modelFixturesLength = modelFixtures.length;
    for (var j = 0; j < modelFixturesLength; j++) {
      var newDoc = new models[model](modelFixtures[j]);
      try {
        await newDoc.save();
      } catch (err) {
        var dupErr;
        if (err.name === 'MongoError' && err.code === 11000) {
          dupErr = customAPIError(
            'DuplicateError',
            'Duplicate fixture: ' + newDoc._id || null,
            400
          );
        }
        throw dupErr || err;
      }
    }
  }
}

module.exports = load;
