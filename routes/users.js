'use strict';

var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').users;

/* GET users list. */
router.get('/', ctrl.listUsers);

/* GET user detail. */
router.get('/:id', ctrl.getUser);

/* POST user. */
router.post('/', ctrl.postUser);

/* PUT user. */
router.put('/:id', ctrl.putUser);

/* PATCH user. */
router.patch('/:id', ctrl.patchUser);

/* DELETE user. */
router.delete('/:id', ctrl.deleteUser);

module.exports = router;
