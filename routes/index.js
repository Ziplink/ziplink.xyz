'use strict';
var express = require('express');

var router = express.Router();

var Ziplink = require('ziplink-basic-mongo-storage');

var newRoute = require('./new.js');
var debugRoute = require('./debug.js');
var editRoute = require('./edit.js');

router.use('/~new', newRoute);
router.use('/', editRoute);

/* If NODE_ENV is undefined or 'development', use the debug route */
if ((process.env.NODE_ENV || 'development') == 'development') {
  router.use('/~debug', debugRoute);
}

/* Render homepage */
router.get('/', function(req, res, next) {
  var err = new Error(err);
  err.status = 404;
  err.message = 'Homepage not yet implemented';
  next(err);
});

router.get('/~:ID', function(req, res, next) {
  var err = new Error('Utility page \'/~' + req.params.ID + '\' not found');
  err.status = 404;
  next(err);
});

/*	Ziplink display page */
router.get('/:ID', function(req, res, next) {

  /* Query DB for ziplink with a matching ID */
  Ziplink.findByID(req.params.ID, function(err, ziplinkData) {
    if (!err && ziplinkData) {
      res.render('ziplink', {
        ziplinkData: ziplinkData,
      });
    } else {
      var err = new Error(err);
      err.status = 404;
      err.message = 'Ziplink with ID ' + req.params.ID + ' not found';
      next(err);
    }
  });

});


module.exports = exports = router;
