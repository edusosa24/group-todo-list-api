const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console for dev
  console.log(err.stack.red);

  // Invalid ID
  if (err.name === 'CastError') {
    const message = `List not found with the ID of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Duplicated username
  if (err.code === 11000) {
    const message = 'Username already in exists.';
    error = new ErrorResponse(message, 400);
  }

  // Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((error) => error.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error.' });
};

module.exports = errorHandler;
