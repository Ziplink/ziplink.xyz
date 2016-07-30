'use strict';
/*	Routes for /:ziplinkID/edit
 *	Used to exit existing ziplinks
 */

var express = require('express');
var router = express.Router();

var Ziplink = require('ziplink-basic-mongo-storage');

router.get('/:ID/edit', function(req, res, next) {
  Ziplink.findByID(req.params.ID, function(err, ziplinkData) {
    if (!err && ziplinkData) {
      res.render('editZiplink', {
        ziplinkData: ziplinkData,
      });
    } else {
      err.status = 404;
      return next(err);
    }
  });
});

/* Post route for editing links
 * Expects a Ziplink object to be passed as a JSON body
 */
router.post('/:ID/edit', function(req, res, next) {

  Ziplink.editZiplink(req.params.ID, req.body.ziplinkData,
    function(err, ziplink) {
      if (err) {
        err.status = 500;
        return next(err);
      }
      res.redirect('/' + req.params.ID);
    });
});

module.exports = exports = router;