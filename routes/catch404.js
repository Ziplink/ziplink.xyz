module.exports = exports = function catch404(req, res, next) {
  var err = new Error('404: Not Found');
  err.status = 404;
  next(err);
};
