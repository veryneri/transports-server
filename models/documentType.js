'use strict';

var documentType = [
  {
    _id: 1,
    nombre: 'Licencia',
  },
  {
    _id: 2,
    nombre: 'INE',
  },
  {
    _id: 3,
    nombre: 'CURP',
  },
];

function getById(id) {
  var actById = documentType.find(function(act) {
    return act.id === id;
  });

  return actById;
}

module.exports = {
  documentType: documentType,
  getById: getById,
};
