var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

/*	Ziplink display page */
/*	Final route before default to avoid pointless db queries */
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

/* Route doesn't match anything else, render homepage */
router.get('/*', function(req, res, next) {
	res.render('error', { message: 'Homepage not yet implemented' });
});

module.exports = exports = router;
