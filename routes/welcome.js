'use strict';

var express = require('express');
var router = express.Router();
var port = require('../config').port;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Magic happens at http://localhost/api:' + port);
});

/* GET user detail. */
router.get('/api/', function(req, res, next) {
  res.send('There will be dragons in the skies!');
});

module.exports = router;
