module.exports = exports = {};

exports.catch404 = function catch404(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

exports.development = function devErrHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
};

exports.production = function prodErrHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
};