var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

/* Ziplink display page */
router.get('/:ziplinkID', function(req, res, next) {

	//TODO: replace placeholder with code to query DB
	var ziplinkData = req.params.ziplinkID;

	res.render('ziplink', { ziplinkData: ziplinkData });
});

/* Route doesn't match anything else, render homepage */
router.get('', function(req, res, next) {
	res.render('error', { message: 'Homepage not yet implemented' });
});

module.exports = exports = router;
