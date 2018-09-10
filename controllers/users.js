'use strict';

var User = require('../models').User;
var customAPIError = require('../errors').customAPIError;
var validator = require('email-validator');

exports.listUsers = function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }

    return res.json(users);
  });
};

exports.getUser = function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      err = customAPIError(
        'UserNotFoundError',
        'User not found.',
        404
      );

      return next(err);
    }

    return res.json(user);
  });
};

exports.postUser = function(req, res, next) {
  var err;

  // Check whether username and password are present or not
  if (!req.body.Name ||
      !req.body.password ||
      !req.body.fLastName ||
      !req.body.email) {
    err = customAPIError(
      'UnmetRequirementsError',
      'Username and password required.',
      400
    );

    return next(err);
  }

  // Validate email.
  if (!validator.validate(req.body.email)) {
    err = customAPIError(
      'InvalidEmailError',
      'Invalid email address.',
      400
    );

    return next(err);
  }

  // Create new user with req information
  var newUser = new User({
    Name: req.body.Name,
    fLastName: req.body.fLastName,
    mLastName: req.body.mLastName,
    password: req.body.password,
    email: req.body.email,
  });

  // Save the user
  newUser.save(function(err) {
    if (err) {
      if (err.code === 11000) {
        err = customAPIError(
          'EmailDuplicateError',
          'Email is already registered.',
          400
        );
      }

      return next(err);
    }

    return res
      .status(201)
      .json(newUser);
  });
};

exports.putUser = function(req, res, next) {
  if (
    !req.body.Name ||
    !req.body.fLastName ||
    !req.body.mLastName ||
    !req.body.password ||
    !req.body.email
  ) {
    var err = customAPIError(
      'UnmetRequirementsError',
      'Name and password required.',
      400
    );

    return next(err);
  }

  var updatedUser = {
    Name: req.body.Name,
    fLastName: req.body.fLastName,
    mLastName: req.body.mLastName,
    password: req.body.password,
    email: req.body.email,
  };

  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updatedUser },
    { new: 1 },
    function(err, user){
      if (err) {
        if (err.code === 11000) {
          err = customAPIError(
            'EmailDuplicateError',
            'Email is already registered.',
            400
          );
        }

        return next(err);
      }

      if (!user) {
        err = customAPIError(
          'UserNotFoundError',
          'User not found.',
          404
        );

        return next(err);
      }

      return res.json(user);
    });
};

exports.patchUser = function(req, res, next) {
  var updatedUser = {};

  if (req.body.Name) updatedUser.Name = req.body.Name;
  if (req.body.fLastName) updatedUser.fLastName = req.body.fLastName;
  if (req.body.mLastName) updatedUser.mLastName = req.body.mLastName;
  if (req.body.password) updatedUser.password = req.body.password;
  if (req.body.email) updatedUser.email = req.body.email;

  if (updatedUser) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatedUser },
      { new: 1 },
      function(err, user) {
        if (err) {
          if (err.code === 11000) {
            err = customAPIError(
              'EmailDuplicateError',
              'Email is already registered.',
              400
            );
          }

          return next(err);
        }

        if (!user) {
          err = customAPIError(
            'UserNotFoundError',
            'User not found.',
            404
          );

          return next(err);
        }

        return res.json(user);
      });
  }
};

exports.deleteUser = function(req, res, next) {

  User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      err = customAPIError(
        'UserNotFoundError',
        'User not found.',
        404
      );

      return next(err);
    }

    return res.status(204).send();
  });
};
