'use strict';

var assert = require('assert');
var superagent = require('superagent');
var port = require('../config').testPort;
var url = 'http://localhost:' + port;
var loginUrl = url + '/api/auth/login';
var expected = require('./expected').users.get;

function loginUserWithNoCredentials(done) {
  superagent.post(loginUrl, function(error, res) {
    assert.ifError(!error);
    assert.equal(res.status, 400);
    assert.equal(
      JSON.parse(res.text).error.message,
      'Email and password required.'
    );
    done();
  });
}

function loginUserWithNoPassword(done) {
  var data = {
    email: expected.email,
  };
  superagent.post(loginUrl, data, function(error, res) {
    assert.ifError(!error);
    assert.equal(res.status, 400);
    assert.equal(
      JSON.parse(res.text).error.message,
      'Email and password required.'
    );
    done();
  });
}

function loginUserWithNoEmail(done) {
  var data = {
    password: expected.password,
  };
  superagent.post(loginUrl, data, function(error, res) {
    assert.ifError(!error);
    assert.equal(res.status, 400);
    assert.equal(
      JSON.parse(res.text).error.message,
      'Email and password required.'
    );
    done();
  });
}

function loginUserWithInvalidCredentials(done) {
  var data = {
    email: expected.email,
    password: expected.password.toUpperCase(),
  };
  superagent.post(loginUrl, data, function(error, res) {
    assert.ifError(!error);
    assert.equal(res.status, 401);
    assert.equal(
      JSON.parse(res.text).message,
      'Authentication failed. Wrong password.'
    );
    done();
  });
}

function loginUser(done) {
  var data = {
    email: expected.email,
    password: expected.password,
  };
  superagent.post(loginUrl, data, function(error, res) {
    assert.ifError(error);
    assert.equal(res.status, 200);
    assert.ok(res.body.token);
    done();
  });
}


module.exports = {
  loginUserWithNoCredentials: loginUserWithNoCredentials,
  loginUserWithNoEmail: loginUserWithNoEmail,
  loginUserWithNoPassword: loginUserWithNoPassword,
  loginUserWithInvalidCredentials: loginUserWithInvalidCredentials,
  loginUser: loginUser,
  loginUserID: expected._id,
};
