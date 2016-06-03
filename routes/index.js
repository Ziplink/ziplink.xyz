var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('error', { message: 'Not yet implemented' });
});

/* Ziplink display page */
router.get('/#*', function(req, res, next) {

	//TODO: replace placeholder with code to query DB
	var ziplinkData = "Placeholder";

	res.render('ziplink', { ziplinkData: ziplinkData });
});

module.exports = router;
