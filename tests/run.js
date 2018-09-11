'use strict';

var app = require('../app');
var mongoose = require('mongoose');
var tests = require('./index');
var port = require('../config').testPort;
var database = require('../config').testDatabase;
var loadFixtures = require('../fixtures/load');
var uid = tests.users.userID;
var userDetail = 'at /api/users/' + uid + '/';

describe('server', function() {

  app.listen(port);
  mongoose.connect(database, {
    useMongoClient: true,
  });

  before(function() {
    loadFixtures();
  });

  after(function() {
    mongoose.connection.db.dropDatabase();
  });

  it('prints out welcome message at /', tests.welcome.helloWorld);
  it('prints out welcome API message at /api/', tests.welcome.helloAPI);
  it('lists users at /api/users/', tests.users.listUsers);
  it('gets user ' + userDetail, tests.users.getUser);
  it('posts user at /api/users/', tests.users.postUser);
  it('patches user ' + userDetail, tests.users.patchUser);
  it('puts user ' + userDetail, tests.users.putUser);
  it('deletes user ' + userDetail, tests.users.deleteUser);
});
