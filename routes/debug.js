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
  
  var err = new Error("Not Yet Implemented");
  next(err);
  
  /* Relies on functionality not present in Ziplink Storage API 0.1
	Ziplink.findByID({}, function(err, ziplinks){
		res.render('debug/all', { ziplinks: ziplinks });
		next(err);
	});
	*/
});


module.exports = exports = router;