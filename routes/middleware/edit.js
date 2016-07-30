'use strict';

var Ziplink = require('ziplink-basic-mongo-storage');

function renderEditZiplinkPage(req, res, next) {
  Ziplink.findById(req.params.id)
    .then(function(ziplink) {
      res.render('editZiplink', {
        ziplinkData: ziplink,
      })
    })
    .catch(next);

}

function postEditZiplinkData(req, res, next) {

  Ziplink.editZiplink(req.params.id, req.body.ziplinkData)
    .then(function(ziplink) {
      res.redirect('/' + ziplink.ID);
    })
    .catch(next);
}

module.exports = exports = {
  renderEditZiplinkPage: renderEditZiplinkPage,
  postEditZiplinkData: postEditZiplinkData,
};