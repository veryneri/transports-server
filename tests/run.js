'use strict';

var app = require('../app');
var mongoose = require('mongoose');
var tests = require('./index');
var port = require('../config').testPort;
var database = require('../config').testDatabase;
var loadFixtures = require('../fixtures/load');
var uid = tests.users.userID;
var userDetail = 'at /api/users/' + uid + '/';
var employeeID = tests.employees.employeeID;
var employeeDetail = 'at /api/employees/' + employeeID + '/';
var vehicleID = tests.vehicles.vehicleID;
var vehicleDetail = 'at /api/vehicles/' + vehicleID + '/';
var assignmentID = tests.assignments.assignmentID;
var assignmentDetail = 'at /api/assignments/' + assignmentID + '/';
var loginUserID = tests.auth.userID;

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

  describe('welcome routes', function() {
    it('prints out welcome message at /', tests.welcome.helloWorld);
    it('prints out welcome API message at /api/', tests.welcome.helloAPI);
  });

  describe('auth routes', function() {
    it(
      'returns error when no credentials passed to /api/auth/login',
      tests.auth.loginUserWithNoCredentials
    );
    it(
      'returns error when no password passed to /api/auth/login',
      tests.auth.loginUserWithNoPassword
    );
    it(
      'returns error when no email passed to /api/auth/login',
      tests.auth.loginUserWithNoEmail
    );
    it(
      'returns error when invalid credentials passed to /api/auth/login',
      tests.auth.loginUserWithInvalidCredentials
    );
    it(
      'returns a token to user ' + loginUserID + ' at /api/auth/login',
      tests.auth.loginUser
    );
  });

  describe('users routes', function() {
    it('lists users at /api/users/', tests.users.listUsers);
    it('gets user ' + userDetail, tests.users.getUser);
    it('posts user at /api/users/', tests.users.postUser);
    it('patches user ' + userDetail, tests.users.patchUser);
    it('puts user ' + userDetail, tests.users.putUser);
    it('deletes user ' + userDetail, tests.users.deleteUser);
  });

  describe('employees routes', function() {
    it('lists employees at /api/employees/', tests.employees.listEmployees);
    it('gets employee ' + employeeDetail, tests.employees.getEmployee);
    it('posts employee at /api/employees/', tests.employees.postEmployee);
    it('patches employee ' + employeeDetail, tests.employees.patchEmployee);
    it('puts employee ' + employeeDetail, tests.employees.putEmployee);
    it('deletes employee ' + employeeDetail, tests.employees.deleteEmployee);
  });

  describe('vehicles routes', function() {
    it('lists vehicles at /api/vehicles/', tests.vehicles.listVehicles);
    it('gets vehicle ' + vehicleDetail, tests.vehicles.getVehicle);
    it('posts vehicle at /api/vehicles/', tests.vehicles.postVehicle);
    it('patches vehicle ' + vehicleDetail, tests.vehicles.patchVehicle);
    it('puts vehicle ' + vehicleDetail, tests.vehicles.putVehicle);
    it('deletes vehicle ' + vehicleDetail, tests.vehicles.deleteVehicle);
  });

  describe('assignments routes', function() {
    it(
      'lists assignments at /api/assignments/',
      tests.assignments.listAssignments
    );
    it(
      'gets assignment ' + assignmentDetail,
      tests.assignments.getAssignment
    );
    it(
      'posts assignment at /api/assignments/',
      tests.assignments.postAssignment
    );
    it(
      'returns error when posting assignment with already ' +
      'assigned employee at /api/assignments/',
      tests.assignments.postAssignmentEmployeeAlreadyAssigned
    );
    it(
      'returns error when posting assignment with already ' +
      'assigned vehicle at /api/assignments/',
      tests.assignments.postAssignmentVehicleAlreadyAssigned
    );
    it(
      'patches assignment ' + assignmentDetail,
      tests.assignments.patchAssignment
    );
    it(
      'puts assignment ' + assignmentDetail,
      tests.assignments.putAssignment
    );
    it(
      'deletes assignment ' + assignmentDetail,
      tests.assignments.deleteAssignment
    );
  });
});
