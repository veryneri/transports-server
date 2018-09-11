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

module.exports = mongoose.model('Assignment', AssignmentSchema);
