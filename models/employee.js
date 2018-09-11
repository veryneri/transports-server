'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var documentTypes = require('./documentType').documentType;
var enumDocumentTypes = documentTypes.map(mapDocumentTypes);
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
      validator: function(v) {
        return enumDocumentTypes.indexOf(v) >= 0;
      },
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

function mapDocumentTypes(documentType) {
  return documentType._id;
}

module.exports = mongoose.model('Employee', EmployeeSchema);
