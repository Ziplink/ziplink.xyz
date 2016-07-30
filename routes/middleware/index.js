'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');

function renderHomepage(req, res, next) {
  var err = new Error(err);
  err.status = 501;
  err.message = 'Homepage not yet implemented';
  return next(err);
}

function renderUnknownUtilityPage(req, res, next) {
  var err = new Error('Utility page \'/~' + req.params.id + '\' not found');
  err.status = 404;
  return next(err);
}

function renderZiplinkDisplayPage(req, res, next) {

  /* Query DB for ziplink with a matching ID */
  Ziplink.findById(req.params.id)
    .then(function(ziplinkData) {
      res.render('ziplink', {
        ziplinkData: ziplinkData,
      });
    })
    .catch(next);
}

module.exports = exports = {
  renderHomepage: renderHomepage,
  renderUnknownUtilityPage: renderUnknownUtilityPage,
  renderZiplinkDisplayPage: renderZiplinkDisplayPage,
};