'use strict';

var assert = require('assert');
var superagent = require('superagent');
var port = require('../config').testPort;
var url = 'http://localhost:' + port;

function helloWorld(done) {
  superagent.get(url + '/', function(error, res) {
    assert.ifError(error);
    assert.equal(res.status, 200);
    assert.equal(
      res.text,
      'Magic happens at http://localhost:' + port + '/api/'
    );
    done();
  });
}

function helloAPI(done) {
  superagent.get(url + '/api/', function(error, res) {
    assert.ifError(error);
    assert.equal(res.status, 200);
    assert.equal(res.text, 'There will be dragons in the skies!');
    done();
  });
}

module.exports = {
  helloWorld: helloWorld,
  helloAPI: helloAPI,
};
