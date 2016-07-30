'use strict';

function renderAllZiplinksPage(req, res, next) {
  var err = new Error('Not Yet Implemented');
  err.status = 501;
  return next(err);
}

module.exports = exports = {
  renderAllZiplinksPage: renderAllZiplinksPage,
};