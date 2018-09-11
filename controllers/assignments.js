'use strict';

var Assignment = require('../models').Assignment;
var customAPIError = require('../errors').customAPIError;

exports.listAssignments = function(req, res, next) {
  Assignment.find({}, function(err, assignments) {
    if (err) {
      return next(err);
    }

    return res.json(assignments);
  });
};

exports.getAssignment = function(req, res, next) {
  Assignment.findOne({ _id: req.params.id }, function(err, assignment) {
    if (err) {
      return next(err);
    }
    if (!assignment) {
      err = customAPIError(
        'AssignmentNotFoundError',
        'Assignment not found.',
        404
      );

      return next(err);
    }

    return res.json(assignment);
  });
};

exports.postAssignment = function(req, res, next) {
  var err;
  if (
    !req.body.employee ||
    !req.body.endGeoPoint ||
    !req.body.startGeoPoint ||
    !req.body.vehicle
  ) {
    err = customAPIError(
      'UnmetRequirementsError',
      'employee, vehicle, startGeoPoint' +
      ' and endGeoPoint are required.',
      400
    );

    return next(err);
  }
  // Create new assignment with req information
  var newAssignment = new Assignment({
    active: req.body.active,
    employee: req.body.employee,
    endGeoPoint: req.body.endGeoPoint,
    startGeoPoint: req.body.startGeoPoint,
    vehicle: req.body.vehicle,
  });

  // Save the assignment
  newAssignment.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        err = customAPIError(
          'AssignmentDuplicateError',
          'Assignment is already registered.',
          400
        );
      }

      return next(err);
    }

    return res
      .status(201)
      .json(newAssignment);
  });
};

exports.putAssignment = function(req, res, next) {
  if (
    req.body.active === undefined ||
    !req.body.employee ||
    !req.body.endGeoPoint ||
    !req.body.startGeoPoint ||
    !req.body.vehicle
  ) {
    var err = customAPIError(
      'UnmetRequirementsError',
      'employee, vehicle, startGeoPoint' +
      ' and endGeoPoint are required.',
      400
    );

    return next(err);
  }

  var updatedAssignment = {
    active: req.body.active,
    employee: req.body.employee,
    endGeoPoint: req.body.endGeoPoint,
    startGeoPoint: req.body.startGeoPoint,
    vehicle: req.body.vehicle,
  };

  Assignment.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedAssignment },
    { new: 1 },
    function(err, assignment){
      if (err) {
        if (err.code === 11000) {
          err = customAPIError(
            'AssignmentDuplicateError',
            'Assignment is already registered.',
            400
          );
        }

        return next(err);
      }

      if (!assignment) {
        err = customAPIError(
          'AssignmentNotFoundError',
          'Assignment not found.',
          404
        );

        return next(err);
      }

      return res.json(assignment);
    });
};

exports.patchAssignment = function(req, res, next) {
  var updatedAssignment = {};

  if (req.body.active !== undefined)
    updatedAssignment.active = req.body.active;
  if (req.body.employee)
    updatedAssignment.employee = req.body.employee;
  if (req.body.endGeoPoint)
    updatedAssignment.endGeoPoint = req.body.endGeoPoint;
  if (req.body.startGeoPoint)
    updatedAssignment.startGeoPoint = req.body.startGeoPoint;
  if (req.body.vehicle)
    updatedAssignment.vehicle = req.body.vehicle;

  if (Object.keys(updatedAssignment).length > 0) {
    Assignment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedAssignment },
      { new: 1 },
      function(err, assignment) {
        if (err) {
          if (err.code === 11000) {
            err = customAPIError(
              'AssignmentDuplicateError',
              'Assignment is already registered.',
              400
            );
          }

          return next(err);
        }

        if (!assignment) {
          err = customAPIError(
            'AssignmentNotFoundError',
            'Assignment not found.',
            404
          );

          return next(err);
        }

        return res.json(assignment);
      });
  }
};

exports.deleteAssignment = function(req, res, next) {
  Assignment.findOneAndRemove(
    { _id: req.params.id },
    function(err, assignment) {
      if (err) {
        return next(err);
      }

      if (!assignment) {
        err = customAPIError(
          'AssignmentNotFoundError',
          'Assignment not found.',
          404
        );

        return next(err);
      }

      return res.status(204).send();
    }
  );
};
