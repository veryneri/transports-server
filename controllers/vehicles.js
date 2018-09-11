'use strict';

var Vehicle = require('../models').Vehicle;
var customAPIError = require('../errors').customAPIError;

exports.listVehicles = function(req, res, next) {
  Vehicle.find({}, function(err, vehicles) {
    if (err) {
      return next(err);
    }

    return res.json(vehicles);
  });
};

exports.getVehicle = function(req, res, next) {
  Vehicle.findOne({ _id: req.params.id }, function(err, vehicle) {
    if (err) {
      return next(err);
    }
    if (!vehicle) {
      err = customAPIError(
        'VehicleNotFoundError',
        'Vehicle not found.',
        404
      );

      return next(err);
    }

    return res.json(vehicle);
  });
};

exports.postVehicle = function(req, res, next) {
  var err;
  if (
    !req.body.vehicleType ||
    !req.body.licensePlate
  ) {
    err = customAPIError(
      'UnmetRequirementsError',
      'name, fLastName, documentType' +
      ' and documentNumber are required.',
      400
    );

    return next(err);
  }
  // Create new vehicle with req information
  var newVehicle = new Vehicle({
    vehicleType: req.body.vehicleType,
    licensePlate: req.body.licensePlate,
  });

  // Save the vehicle
  newVehicle.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        err = customAPIError(
          'VehicleDuplicateError',
          'Vehicle is already registered.',
          400
        );
      }

      return next(err);
    }

    return res
      .status(201)
      .json(newVehicle);
  });
};

exports.putVehicle = function(req, res, next) {
  if (
    !req.body.vehicleType ||
    !req.body.licensePlate
  ) {
    var err = customAPIError(
      'UnmetRequirementsError',
      'vehicleType and licensePlate are required.',
      400
    );

    return next(err);
  }

  var updatedVehicle = {
    vehicleType: req.body.vehicleType,
    licensePlate: req.body.licensePlate,
  };

  Vehicle.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedVehicle },
    { new: 1 },
    function(err, vehicle){
      if (err) {
        if (err.code === 11000) {
          err = customAPIError(
            'VehicleDuplicateError',
            'Vehicle is already registered.',
            400
          );
        }

        return next(err);
      }

      if (!vehicle) {
        err = customAPIError(
          'VehicleNotFoundError',
          'Vehicle not found.',
          404
        );

        return next(err);
      }

      return res.json(vehicle);
    });
};

exports.patchVehicle = function(req, res, next) {
  var updatedVehicle = {};

  if (req.body.vehicleType)
    updatedVehicle.vehicleType = req.body.vehicleType;
  if (req.body.licensePlate)
    updatedVehicle.licensePlate = req.body.licensePlate;

  if (Object.keys(updatedVehicle).length > 0) {
    Vehicle.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedVehicle },
      { new: 1 },
      function(err, vehicle) {
        if (err) {
          if (err.code === 11000) {
            err = customAPIError(
              'VehicleDuplicateError',
              'Vehicle is already registered.',
              400
            );
          }

          return next(err);
        }

        if (!vehicle) {
          err = customAPIError(
            'VehicleNotFoundError',
            'Vehicle not found.',
            404
          );

          return next(err);
        }

        return res.json(vehicle);
      });
  }
};

exports.deleteVehicle = function(req, res, next) {
  Vehicle.findOneAndRemove({ _id: req.params.id }, function(err, vehicle) {
    if (err) {
      return next(err);
    }

    if (!vehicle) {
      err = customAPIError(
        'VehicleNotFoundError',
        'Vehicle not found.',
        404
      );

      return next(err);
    }

    return res.status(204).send();
  });
};
