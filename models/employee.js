'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fLastName: {
    type: String,
    required: true,
  },
  mLastName: {
    type: String,
  },
  documentType: {
    type: Number,
    required: true,
    validate: {
      validator: documentTypeAllowedValues,
      message: '{VALUE} is not a valid documentType.',
    },
  },
  documentNumber: {
    type: String,
    required: true,
  },
});
EmployeeSchema.index(
  {
    documentType: 1,
    documentNumber: 1,
  },
  {
    unique: true,
  }
);

function documentTypeAllowedValues(v) {
  var documentTypes = require('./documentType').documentType;
  var allowedValues = documentTypes.map(function(dType) {
    return dType._id;
  });

  return allowedValues.indexOf(v) >= 0;
}

module.exports = mongoose.model('Employee', EmployeeSchema);
