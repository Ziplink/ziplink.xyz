var express = require('express');
var router = express.Router();

var newRoute = require('./new.js');

//Reference to Ziplink model
var Ziplink = require('../models/Ziplink.js');

router.use('/new', newRoute);

/* Render homepage */
router.get('/', function(req, res, next) {
	res.render('error', { message: 'Homepage not yet implemented' });
});

/*	Ziplink display page */
router.get('/:ziplinkID', function(req, res, next) {

	//Query DB for ziplink with a matching ID
	Ziplink.findByID(req.params.ziplinkID, function(err, ziplinkData){
		if(!err && ziplinkData){
			res.render('ziplink', { ziplinkData: ziplinkData });
		} else {
			next();
		}
	});

});


module.exports = exports = router;
