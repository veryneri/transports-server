'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var AssignmentSchema = new Schema({
  employee: {
    type: Schema.ObjectId,
    ref: 'Employee',
    required: true,
  },
  vehicle: {
    type: Schema.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  startGeoPoint: {
    type: [Number],
    required: true,
  },
  endGeoPoint: {
    type: [Number],
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

AssignmentSchema.path('employee').validate(
  function(value) {
    return new Promise(function(resolve, reject) {
      mongoose.models['Employee'].findOne(
        {_id: value},
        function(err, employee) {
          if (err) reject(err);
          var employeeExists = false;
          if (employee)
            employeeExists = true;

          resolve(employeeExists);
        }
      );
    });
  },
  'Employee does not exists'
);

AssignmentSchema.path('vehicle').validate(
  function(value) {
    return new Promise(function(resolve, reject) {
      mongoose.models['Vehicle'].findOne(
        {_id: value},
        function(err, vehicle) {
          if (err) reject(err);
          var vehicleExists = false;
          if (vehicle)
            vehicleExists = true;

          resolve(vehicleExists);
        }
      );
    });
  },
  'Vehicle does not exists'
);

AssignmentSchema.pre('save', function(next) {
  var newAssignment = this;
  var customAPIError = require('../errors').customAPIError;


  mongoose.models['Assignment'].findOne(
    {
      $or: [
        {
          employee: newAssignment.employee,
          active: true,
        },
        {
          vehicle: newAssignment.vehicle,
          active: true,
        },
      ],
    },
    function(err, currentAssignment) {
      console.log(currentAssignment);
      if (err)
        return next(err);

      if (currentAssignment) {
        if (
          currentAssignment.vehicle.toString() ===
          newAssignment.vehicle.toString()
        ) {
          err = customAPIError(
            'VehicleAlreadyAssignedError',
            'Vehicle is already assigned.',
            400
          );
        }
        if (
          currentAssignment.employee.toString() ===
          newAssignment.employee.toString()
        ) {
          err = customAPIError(
            'EmployeeAlreadyAssignedError',
            'Employee is already assigned.',
            400
          );
        }

        return next(err);
      }

      return next();
    }
  );
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
