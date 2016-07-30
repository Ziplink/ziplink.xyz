'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');

function renderEditZiplinkPage(req, res, next) {
  Ziplink.findByID(req.params.id, function(err, ziplinkData) {
    if (!err && ziplinkData) {
      res.render('editZiplink', {
        ziplinkData: ziplinkData,
      });
    } else {
      err.status = 404;
      return next(err);
    }
  });
}

function postEditZiplinkData(req, res, next) {

  Ziplink.editZiplink(req.params.id, req.body.ziplinkData,
    function(err, ziplink) {
      if (err) {
        err.status = 500;
        return next(err);
      }
      res.redirect('/' + req.params.id);
    });
}

module.exports = exports = {
  renderEditZiplinkPage: renderEditZiplinkPage,
  postEditZiplinkData: postEditZiplinkData,
};