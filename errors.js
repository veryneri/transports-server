var config = require('./config');

function notFoundError(req, res, next) {
  var err = customAPIError('NotFoundError', 'Resource not found.', 404);
  next(err);
}

function internalServerError(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.env === 'development' ? err : {};

  // render the error page
  res.status(normalizeStatus(err.status));
  res.send({error: err});
}

function customAPIError(name, message, status) {
  var err = new Error();
  err.status = normalizeStatus(status);
  err.name = name;
  err.message = message

  return err;
}

function normalizeStatus(status) {
  return !isNaN(status) ? status : 500;
}

module.exports = {
  notFoundError: notFoundError,
  internalServerError: internalServerError,
  customAPIError: customAPIError
}