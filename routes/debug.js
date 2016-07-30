'use strict';
/*
 *	Routes for ./~debug
 *	Contains all debugging routes
 */

var express = require('express');
var router = express.Router();

var Ziplink = require('ziplink-basic-mongo-storage');

router.get('/all', function(req, res, next) {
  var err = new Error('Not Yet Implemented');
  return next(err);
});

module.exports = exports = router;