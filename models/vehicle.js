'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var vehicle = new Schema({
  vehicleType: {
    type: Number,
    required: true,
    validate: {
      validator: vehicleTypeAllowedValues,
      message: '{VALUE} is not a valid vehicleType.',
    },
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
});

function vehicleTypeAllowedValues(v) {
  var vehicleTypes = require('./vehicleType').vehicleType;
  var allowedValues = vehicleTypes.map(function(vType) {
    return vType._id;
  });

  return allowedValues.indexOf(v) >= 0;
}

module.exports = mongoose.model('Vehicle', vehicle);
