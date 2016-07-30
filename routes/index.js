'use strict';
var express = require('express');

var router = express.Router();

var newRoute = require('./new.js');
var debugRoute = require('./debug.js');
var editRoute = require('./edit.js');

var middleware = require('./middleware/index.js');

/* If NODE_ENV is undefined or 'development', use the debug route */
if ((process.env.NODE_ENV || 'development') == 'development') {
  router.use('/~debug', debugRoute);
}

router.use('/~new', newRoute);
router.use('/:id/edit', editRoute);
router.get('/', middleware.renderHomepage);

// Catch unknown /~* routes
router.all('/~:id', middleware.renderUnknownUtilityPage);

/*	Ziplink display page */
router.get('/:id', middleware.renderZiplinkDisplayPage);


module.exports = exports = router;
