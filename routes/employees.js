'use strict';

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').employees;

/* GET employees list. */
router.get('/', ctrl.listEmployees);

/* GET employee detail. */
router.get('/:id', ctrl.getEmployee);

/* POST employee. */
router.post('/', ctrl.postEmployee);

/* PUT employee. */
router.put('/:id', ctrl.putEmployee);

/* PATCH employee. */
router.patch('/:id', ctrl.patchEmployee);

/* DELETE employee. */
router.delete('/:id', ctrl.deleteEmployee);

module.exports = router;
