const logger = require("../../utils/logger");

// This middleware catches all errors and sends a standardized response
const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    sessionId: req.body.sessionId || "N/A",
  });

  const statusCode = err.statusCode || 500;
  const responseMessage =
    "An unexpected error occurred. Please try again later.";

  res.status(statusCode).json({
    sessionId: req.body.sessionId,
    error: responseMessage,
  });
};

module.exports = errorHandler;
