'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(
    'Magic happens at http://' + req.get('host') + '/api/'
  );
});

/* GET user detail. */
router.get('/api/', function(req, res, next) {
  res.send('There will be dragons in the skies!');
});

module.exports = router;
