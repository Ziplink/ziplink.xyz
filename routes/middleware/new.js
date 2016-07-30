'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');
var Promise = require('bluebird');

function newZiplinkGetHandler(req, res, next) {
  res.render('newZiplink', {});
}

function redirectToZiplink(req, res, next) {
  return new Promise(function(ziplink) {
    res.redirect('/' + ziplink.ID);
  });
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
  console.log(ziplinkData);
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