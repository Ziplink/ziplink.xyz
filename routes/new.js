/*
 *	Routes for /new
 *	
 *	Used to create new ziplinks
 * 
 */

var express = require('express');
var router = express.Router();

var Ziplink = require('ziplink-basic-mongo-storage');

router.get('/', function(req, res, next){
	res.render('newZiplink', {});
});

/* 
 * Post route for creating new links
 * Expects a Ziplink object to be passed as a JSON body
 */
router.post('/', function(req, res, next){
  
  var ziplinkData = {
    name: req.body.name,
    sublinks: req.body.sublinks
  };
  
  if(typeof req.session.passport !== 'undefined')
    ziplinkData.user = { 'id': req.session.passport.user._id };

	Ziplink.createZiplink(ziplinkData, function(err, ziplink){
		if(err){
			next(err);
		} else {
			res.redirect('/' + ziplink.ID);
		}
	});
});

module.exports = exports = router;