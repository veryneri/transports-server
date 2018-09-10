var express = require('express');
var router = express.Router();
var ctrl = require('../controllers').setup;

/* LOGIN user. */
router.get('/', ctrl.setUp);

module.exports = router;