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

	Ziplink.createZiplink(req.body, function(err, ziplink){
	  
		if(err != null){
			var err = new Error(err);
			err.status = 500;
			err.message = "Error creating ziplink";
			next(err);
		} else {
			res.redirect('/' + ziplink.ID);
		}
	});
});

module.exports = exports = router;