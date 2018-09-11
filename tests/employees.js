'use strict';

var assert = require('assert');
var expected = require('./expected').employees;
var superagent = require('superagent');
var port = require('../config').testPort;
var Employee = require('../models').Employee;

var employeeID = expected.get._id;
var url = 'http://localhost:' + port;
var employeesListURL = url + '/api/employees/';
var employeeDetailURL = url + '/api/employees/' + employeeID + '/';

function listEmployees(done) {
  superagent
    .get(employeesListURL)
    .withCredentials()
    .end(function(err, res){
      assert.ifError(err);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.list.toString());
      done();
    });
}

function postEmployee(done) {
  var newEmployee = {
    name: 'Edson',
    fLastName: 'Neri',
    mLastName: 'Jiménez',
    documentType: 1,
    documentNumber: '1234567890',
  };

  superagent
    .post(employeesListURL)
    .send(newEmployee)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 201);
      Employee.findOne({_id: res.body._id}, function(err, employee){
        assert.ifError(err);
        assert.ok(employee);
      });
      done();
    });
}

function getEmployee(done) {
  superagent
    .get(employeeDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.get.toString());
      done();
    });
}

function putEmployee(done) {
  var updatedEmployee = {
    name: 'Vivian',
    fLastName: 'Sosa',
    mLastName: 'Mosqueda',
    documentType: 2,
    documentNumber: '1234567',
  };

  superagent
    .put(employeeDetailURL)
    .send(updatedEmployee)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Employee.findOne({_id: employeeID}, function(err, employee){
        assert.ifError(err);
        assert.equal(employee.name, updatedEmployee.name);
        assert.equal(employee.fLastName, updatedEmployee.fLastName);
        assert.equal(employee.mLastName, updatedEmployee.mLastName);
        assert.equal(employee.documentNumber, updatedEmployee.documentNumber);
        assert.equal(employee.documentType, updatedEmployee.documentType);
      });
      done();
    });
}

function patchEmployee(done) {
  var updatedEmployee = {
    name: 'Ximena',
  };

  superagent
    .patch(employeeDetailURL)
    .send(updatedEmployee)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Employee.findOne({_id: employeeID}, function(err, employee){
        assert.ifError(err);
        assert.equal(employee.name, updatedEmployee.name);
      });
      done();
    });
}

function deleteEmployee(done) {
  superagent
    .delete(employeeDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 204);
      Employee.findOne({_id: employeeID}, function(err, employee){
        assert.ifError(err);
        assert.ok(!employee);
      });
      done();
    });
}

module.exports = {
  listEmployees: listEmployees,
  postEmployee: postEmployee,
  getEmployee: getEmployee,
  putEmployee: putEmployee,
  patchEmployee: patchEmployee,
  deleteEmployee: deleteEmployee,
  employeeID: employeeID,
};
