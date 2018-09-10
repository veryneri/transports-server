var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').auth;

/* LOGIN user. */
router.post('/login', ctrl.loginUser);

module.exports = router;
