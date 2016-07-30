'use strict';
/*
 *	Routes for ./~debug
 *	Contains all debugging routes
 */

var express = require('express');
var router = express.Router();
var middleware = require('./middleware/debug');

router.get('/all', middleware.renderAllZiplinksPage);

module.exports = exports = router;