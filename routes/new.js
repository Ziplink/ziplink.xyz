/*
 *	Routes for /new
 *	
 *	Used to create new ziplinks
 * 
 */

var express = require('express');
var router = express.Router();

var Ziplink = require('../models/Ziplink.js');

router.get('/', function(req, res, next){
	res.render('newZiplink', {});
});

/* 
 * Post route for creating new links
 * Expects a Ziplink object to be passed as a JSON body
 */
router.post('/', function(req, res, next){

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

module.exports = exports = router;