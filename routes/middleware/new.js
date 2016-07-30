'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');

function newZiplinkGetHandler(req, res, next) {
  res.render('newZiplink', {});
}

function newZiplinkPostHandler(req, res, next) {
  var ziplinkData = {
    name: req.body.name,
    sublinks: req.body.sublinks,
  };

  if (typeof req.session.passport !== 'undefined') {
    ziplinkData.user = {
      id: req.session.passport.user.id,
    };
  }
  Ziplink.createZiplink(ziplinkData, function(err, ziplink) {
    if (err) {
      return next(err);
    }
    res.redirect('/' + ziplink.ID);
  });

}

module.exports = exports = {
  get: newZiplinkGetHandler,
  post: newZiplinkPostHandler,
};