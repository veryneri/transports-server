'use strict';

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').vehicles;

/* GET vehicles list. */
router.get('/', ctrl.listVehicles);

/* GET vehicle detail. */
router.get('/:id', ctrl.getVehicle);

/* POST vehicle. */
router.post('/', ctrl.postVehicle);

/* PUT vehicle. */
router.put('/:id', ctrl.putVehicle);

/* PATCH vehicle. */
router.patch('/:id', ctrl.patchVehicle);

/* DELETE vehicle. */
router.delete('/:id', ctrl.deleteVehicle);

module.exports = router;
