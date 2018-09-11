'use strict';

var assert = require('assert');
var expected = require('./expected').vehicles;
var superagent = require('superagent');
var port = require('../config').testPort;
var Vehicle = require('../models').Vehicle;

var vehicleID = expected.get._id;
var url = 'http://localhost:' + port;
var vehiclesListURL = url + '/api/vehicles/';
var vehicleDetailURL = url + '/api/vehicles/' + vehicleID + '/';

function listVehicles(done) {
  superagent
    .get(vehiclesListURL)
    .withCredentials()
    .end(function(err, res){
      assert.ifError(err);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.list.toString());
      done();
    });
}

function postVehicle(done) {
  var newVehicle = {
    vehicleType: 1,
    licensePlate: '1234567890',
  };

  superagent
    .post(vehiclesListURL)
    .send(newVehicle)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 201);
      Vehicle.findOne({_id: res.body._id}, function(err, vehicle){
        assert.ifError(err);
        assert.ok(vehicle);
      });
      done();
    });
}

function getVehicle(done) {
  superagent
    .get(vehicleDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      assert.equal(res.body, expected.get.toString());
      done();
    });
}

function putVehicle(done) {
  var updatedVehicle = {
    vehicleType: 2,
    licensePlate: '1234567',
  };

  superagent
    .put(vehicleDetailURL)
    .send(updatedVehicle)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Vehicle.findOne({_id: vehicleID}, function(err, vehicle){
        assert.ifError(err);
        assert.equal(vehicle.licensePlate, updatedVehicle.licensePlate);
        assert.equal(vehicle.vehicleType, updatedVehicle.vehicleType);
      });
      done();
    });
}

function patchVehicle(done) {
  var updatedVehicle = {
    vehicleType: 2,
  };

  superagent
    .patch(vehicleDetailURL)
    .send(updatedVehicle)
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 200);
      Vehicle.findOne({_id: vehicleID}, function(err, vehicle){
        assert.ifError(err);
        assert.equal(vehicle.vehicleType, updatedVehicle.vehicleType);
      });
      done();
    });
}

function deleteVehicle(done) {
  superagent
    .delete(vehicleDetailURL)
    .withCredentials()
    .end(function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, 204);
      Vehicle.findOne({_id: vehicleID}, function(err, vehicle){
        assert.ifError(err);
        assert.ok(!vehicle);
      });
      done();
    });
}

module.exports = {
  listVehicles: listVehicles,
  postVehicle: postVehicle,
  getVehicle: getVehicle,
  putVehicle: putVehicle,
  patchVehicle: patchVehicle,
  deleteVehicle: deleteVehicle,
  vehicleID: vehicleID,
};
