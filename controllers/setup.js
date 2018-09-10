var loadFixtures = require('../fixtures/load');
var mongoose = require('mongoose');

exports.setUp = function(req, res, next) {
  // Clean database
  mongoose.connection.db.dropDatabase();

  // Try to load fixtures
  try {
    loadFixtures();
  } catch(err) {
    return next(err);
  }

  return res.json({success: true, message: 'Fixtures loaded'});
};