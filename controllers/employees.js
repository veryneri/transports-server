'use strict';

var Employee = require('../models').Employee;
var customAPIError = require('../errors').customAPIError;

exports.listEmployees = function(req, res, next) {
  Employee.find({}, function(err, employees) {
    if (err) {
      return next(err);
    }

    return res.json(employees);
  });
};

exports.getEmployee = function(req, res, next) {
  Employee.findOne({ _id: req.params.id }, function(err, employee) {
    if (err) {
      return next(err);
    }
    if (!employee) {
      err = customAPIError(
        'EmployeeNotFoundError',
        'Employee not found.',
        404
      );

      return next(err);
    }

    return res.json(employee);
  });
};

exports.postEmployee = function(req, res, next) {
  var err;
  if (
    !req.body.name ||
    !req.body.fLastName ||
    !req.body.documentNumber ||
    !req.body.documentType
  ) {
    err = customAPIError(
      'UnmetRequirementsError',
      'name, fLastName, documentType' +
      ' and documentNumber are required.',
      400
    );

    return next(err);
  }
  // Create new employee with req information
  var newEmployee = new Employee({
    name: req.body.name,
    fLastName: req.body.fLastName,
    mLastName: req.body.mLastName,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
  });

  // Save the employee
  newEmployee.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        err = customAPIError(
          'EmployeeDuplicateError',
          'Employee is already registered.',
          400
        );
      }

      return next(err);
    }

    return res
      .status(201)
      .json(newEmployee);
  });
};

exports.putEmployee = function(req, res, next) {
  if (
    !req.body.name ||
    !req.body.fLastName ||
    !req.body.mLastName ||
    !req.body.documentNumber ||
    !req.body.documentType
  ) {
    var err = customAPIError(
      'UnmetRequirementsError',
      'name, fLastName, mLastName, documentType' +
      ' and documentNumber are required.',
      400
    );

    return next(err);
  }

  var updatedEmployee = {
    name: req.body.name,
    fLastName: req.body.fLastName,
    mLastName: req.body.mLastName,
    documentType: req.body.documentType,
    documentNumber: req.body.documentNumber,
  };

  Employee.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedEmployee },
    {
      new: 1,
      runValidators: true,
    },
    function(err, employee){
      if (err) {
        if (err.code === 11000) {
          err = customAPIError(
            'EmployeeDuplicateError',
            'Employee is already registered.',
            400
          );
        }

        return next(err);
      }

      if (!employee) {
        err = customAPIError(
          'EmployeeNotFoundError',
          'Employee not found.',
          404
        );

        return next(err);
      }

      return res.json(employee);
    });
};

exports.patchEmployee = function(req, res, next) {
  var updatedEmployee = {};

  if (req.body.name) updatedEmployee.name = req.body.name;
  if (req.body.fLastName) updatedEmployee.fLastName = req.body.fLastName;
  if (req.body.mLastName) updatedEmployee.mLastName = req.body.mLastName;
  if (req.body.documentNumber)
    updatedEmployee.documentNumber = req.body.documentNumber;
  if (req.body.documentType)
    updatedEmployee.documentType = req.body.documentType;

  if (Object.keys(updatedEmployee).length > 0) {
    Employee.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedEmployee },
      {
        new: 1,
        runValidators: true,
      },
      function(err, employee) {
        if (err) {
          if (err.code === 11000) {
            err = customAPIError(
              'EmployeeDuplicateError',
              'Employee is already registered.',
              400
            );
          }

          return next(err);
        }

        if (!employee) {
          err = customAPIError(
            'EmployeeNotFoundError',
            'Employee not found.',
            404
          );

          return next(err);
        }

        return res.json(employee);
      });
  }
};

exports.deleteEmployee = function(req, res, next) {
  Employee.findOneAndRemove({ _id: req.params.id }, function(err, employee) {
    if (err) {
      return next(err);
    }

    if (!employee) {
      err = customAPIError(
        'EmployeeNotFoundError',
        'Employee not found.',
        404
      );

      return next(err);
    }

    return res.status(204).send();
  });
};
