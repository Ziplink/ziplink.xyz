var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

/*// User display page, not yet implemented, should eventually have it's own router
router.get('/@:userID', function(req, res, next){
	res.render('user', {});
});
*/

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

router.get('/new', function(req, res, next){
	res.render('newZiplink', {});
});

/* 
 * Post route for creating new links
 * Expects a Ziplink object to be passed as a JSON body
 */
router.post('/new', function(req, res, next){

	console.log(req.body);
	var newZiplink = new Ziplink(req.body);
	newZiplink.save(function(err){ //validation handled by model
		if(err){
			res.render('error', {message: err});
		} else {
			res.redirect('/' + newZiplink.ziplinkID);
		}
	}); 
});

/* Render homepage */
router.get('/', function(req, res, next) {
	res.render('error', { message: 'Homepage not yet implemented' });
});





module.exports = exports = router;
