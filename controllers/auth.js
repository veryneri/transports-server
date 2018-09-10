var User = require('../models').User;
var customAPIError = require('../errors').customAPIError;
var config = require("../config");
var jwt = require('jwt-simple');

exports.loginUser = function(req, res, next) {
  // Account and password in req.body validation
  if (!req.body.email ||
      !req.body.password) {
    var err = customAPIError('UnmetRequirementsError',
                             'Email and password required.',
                             400);
    return next(err);
  }

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) return next(err);

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Authentication failed. User not found.' });

    // if user is found and password is right
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (err) return next(err);

      if (!isMatch) {
        return res
          .status(401)
          .send({success: false, message: 'Authentication failed. Wrong password.'});
      }

      var payload = {
        email: user.email,
        nombre: user.nombre
      };

      // if user is found and password is right create a token
      var token = jwt.encode(payload, config.secret);

      // return the information including token as JSON
      res.json({success: true, token: token});
    });

  });
};
