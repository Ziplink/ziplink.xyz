'use strict';
var log = require('ziplink-logger');

var developmentErrorHandler = function devErrHandler(err, req, res, next) {
  log.debug('Error processing request at "' + req.url + '": ' + err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
};

var productionErrorHandler = function prodErrHandler(err, req, res, next) {
  log.debug('Error processing request at ' + req.url + ': ' + err.message);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
};

if (false) { // Temporary, to use global config to determine production/dev
  module.exports = exports = productionErrorHandler;
} else {
  module.exports = exports = developmentErrorHandler;
}
