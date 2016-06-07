var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

var newRoute = require('./new.js');

router.use('/new', newRoute);

/* Render homepage */
router.get('/', function(req, res, next) {
	var err = new Error(err);
	err.status = 404;
	err.message = "Homepage not yet implemented";
	next(err);
});

/*	Ziplink display page */
router.get('/:ziplinkID', function(req, res, next) {

	//Query DB for ziplink with a matching ID
	Ziplink.findByID(req.params.ziplinkID, function(err, ziplinkData){
		if(!err && ziplinkData){
			res.render('ziplink', { ziplinkData: ziplinkData });
		} else {
			var err = new Error(err);
			err.status = 404;
			err.message = "Ziplink with ID " + req.params.ziplinkID + " not found";
			next(err);
		}
	});

});


module.exports = exports = router;
