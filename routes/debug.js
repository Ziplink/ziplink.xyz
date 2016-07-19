/*
 *	Routes for /debug
 *	
 *	Contains all debugging routes
 * 
 */

var express = require('express');
var router = express.Router();

var Ziplink = require('ziplink-basic-mongo-storage');

router.get('/all', function(req, res, next){
	Ziplink.find({}, function(err, ziplinks){
		res.render('debug/all', { ziplinks: ziplinks });
	});
});


module.exports = exports = router;