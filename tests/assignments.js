'use strict';

var assert = require('assert');
var expected = require('./expected').assignments;
var superagent = require('superagent');
var port = require('../config').testPort;
var Assignment = require('../models').Assignment;

var assignmentID = expected.get._id;
var url = 'http://localhost:' + port;
var assignmentsListURL = url + '/api/assignments/';
var assignmentDetailURL = url + '/api/assignments/' + assignmentID + '/';
var employeeFixture = require('./expected').employees.get;
var vehicleFixture = require('./expected').vehicles.get;

function listAssignments(done) {
  superagent
    .get(assignmentsListURL)
    .withCredentials()
    .end(function(err, res){
      assert.ifError(err);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.list.toString());
      done();
    });
}

function postAssignment(done) {
  var newAssignment = {
    vehicle: vehicleFixture._id,
    employee: employeeFixture._id,
    active: true,
    startGeoPoint: [99.456764, -44.880000],
    endGeoPoint: [99.556764, -44.980000],
  };

  superagent
    .post(assignmentsListURL)
    .send(newAssignment)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 201);
      Assignment.findOne({_id: res.body._id}, function(err, assignment) {
        assert.ifError(err);
        assert.ok(assignment);
      });
      done();
    });
}

function getAssignment(done) {
  superagent
    .get(assignmentDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.get.toString());
      done();
    });
}

function putAssignment(done) {
  var updatedAssignment = {
    vehicle: vehicleFixture._id,
    employee: employeeFixture._id,
    active: false,
    startGeoPoint: [99.576764, -44.880000],
    endGeoPoint: [99.566764, -44.980000],
  };

  superagent
    .put(assignmentDetailURL)
    .send(updatedAssignment)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Assignment.findOne({_id: assignmentID}, function(err, assignment) {
        assert.ifError(err);
        assert.equal(assignment.employee, updatedAssignment.employee);
        assert.equal(assignment.vehicle, updatedAssignment.vehicle);
        assert.equal(assignment.active, updatedAssignment.active);
        assert.equal(
          assignment.endGeoPoint.toString(),
          updatedAssignment.endGeoPoint.toString()
        );
        assert.equal(
          assignment.startGeoPoint.toString(),
          updatedAssignment.startGeoPoint.toString()
        );
      });
      done();
    });
}

function patchAssignment(done) {
  var updatedAssignment = {
    startGeoPoint: [95.576764, -44.880000],
  };

  superagent
    .patch(assignmentDetailURL)
    .send(updatedAssignment)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Assignment.findOne({_id: assignmentID}, function(err, assignment) {
        assert.ifError(err);
        assert.equal(
          assignment.startGeoPoint.toString(),
          updatedAssignment.startGeoPoint.toString()
        );
      });
      done();
    });
}

function deleteAssignment(done) {
  superagent
    .delete(assignmentDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 204);
      Assignment.findOne({_id: assignmentID}, function(err, assignment) {
        assert.ifError(err);
        assert.ok(!assignment);
      });
      done();
    });
}

module.exports = {
  listAssignments: listAssignments,
  postAssignment: postAssignment,
  getAssignment: getAssignment,
  putAssignment: putAssignment,
  patchAssignment: patchAssignment,
  deleteAssignment: deleteAssignment,
  assignmentID: assignmentID,
};
