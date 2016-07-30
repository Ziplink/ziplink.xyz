'use strict';
/*	Routes for /:ziplinkID/edit
 *	Used to edit existing ziplinks
 */

var express = require('express');
var router = express.Router({ mergeParams: true });
var middleware = require('./middleware/edit');

router.get('/', middleware.renderEditZiplinkPage);

/* Post route for editing links
 * Expects a Ziplink object to be passed as a JSON body
 */
router.post('/', middleware.postEditZiplinkData);

module.exports = exports = router;