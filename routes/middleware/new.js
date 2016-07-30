'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');

function newZiplinkGetHandler(req, res, next) {
  return res.render('newZiplink', {});
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
  Ziplink.createZiplink(ziplinkData)
    .then(function(ziplink) {
      res.redirect('/' + ziplink.ID);
    })
    .catch(next);

}
module.exports = exports = {
  get: newZiplinkGetHandler,
  post: newZiplinkPostHandler,
};