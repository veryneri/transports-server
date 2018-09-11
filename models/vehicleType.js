'use strict';

var vehicleType = [
  {
    _id: 1,
    nombre: 'Vagoneta',
  },
  {
    _id: 2,
    nombre: 'Microbus',
  },
  {
    _id: 3,
    nombre: 'Autobus',
  },
];

function getById(id) {
  var vTypeById = vehicleType.find(function(vType) {
    return vType.id === id;
  });

  return vTypeById;
}

module.exports = {
  vehicleType: vehicleType,
  getById: getById,
};
