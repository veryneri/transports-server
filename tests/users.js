'use strict';

var assert = require('assert');
var expected = require('./expected').users;
var superagent = require('superagent');
var port = require('../config').testPort;
var User = require('../models').User;

var userID = expected.get._id;
var url = 'http://localhost:' + port;
var usersListURL = url + '/api/users/';
var userDetailURL = url + '/api/users/' + userID + '/';

function listUsers(done) {
  superagent
    .get(usersListURL)
    .withCredentials()
    .end(function(err, res){
      assert.ifError(err);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.list.toString());
      done();
    });
}

function postUser(done) {
  var newUser = {
    name: 'Edson',
    fLastName: 'Neri',
    mLastName: 'Jiménez',
    password: 'edson123',
    email: 'edson.neri@mail.com',
  };

  superagent
    .post(usersListURL)
    .send(newUser)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 201);
      User.findOne({_id: res.body._id}, function(err, user){
        assert.ifError(err);
        assert.ok(user);
      });
      done();
    });
}

function getUser(done) {
  superagent
    .get(userDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.get.toString());
      done();
    });
}

function putUser(done) {
  var updatedUser = {
    name: 'Vivian',
    fLastName: 'Sosa',
    mLastName: 'Mosqueda',
    password: 'xvsm123',
    email: 'viviana.soso@mail.com',
  };

  superagent
    .put(userDetailURL)
    .send(updatedUser)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      User.findOne({_id: userID}, function(err, user){
        assert.ifError(err);
        assert.equal(user.name, updatedUser.name);
        assert.equal(user.fLastName, updatedUser.fLastName);
        assert.equal(user.mLastName, updatedUser.mLastName);
        assert.equal(user.email, updatedUser.email);
      });
      done();
    });
}

function patchUser(done) {
  var updatedUser = {
    name: 'Ximena',
  };

  superagent
    .patch(userDetailURL)
    .send(updatedUser)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      User.findOne({_id: userID}, function(err, user){
        assert.ifError(err);
        assert.equal(user.username, updatedUser.username);
      });
      done();
    });
}

function deleteUser(done) {
  superagent
    .delete(userDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 204);
      User.findOne({_id: userID}, function(err, user){
        assert.ifError(err);
        assert.ok(!user);
      });
      done();
    });
}

module.exports = {
  listUsers: listUsers,
  postUser: postUser,
  getUser: getUser,
  putUser: putUser,
  patchUser: patchUser,
  deleteUser: deleteUser,
  userID: userID,
};
