'use strict';

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').assignments;

/* GET assignments list. */
router.get('/', ctrl.listAssignments);

/* GET assignment detail. */
router.get('/:id', ctrl.getAssignment);

/* POST assignment. */
router.post('/', ctrl.postAssignment);

/* PUT assignment. */
router.put('/:id', ctrl.putAssignment);

/* PATCH assignment. */
router.patch('/:id', ctrl.patchAssignment);

/* DELETE assignment. */
router.delete('/:id', ctrl.deleteAssignment);

module.exports = router;
