'use strict';
/*	Routes for /new
 *	Used to create new ziplinks
 */

var express = require('express');
var router = express.Router();

var middleware = require('./middleware/new');

router.get('/', middleware.get);
router.post('/', middleware.post);

module.exports = exports = router;