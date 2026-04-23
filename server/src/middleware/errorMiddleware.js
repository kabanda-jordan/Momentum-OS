export const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  let message = error.message || "Something went wrong.";

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource identifier.";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "A record with one of those values already exists.";
  }

  if (error.type === "entity.parse.failed") {
    statusCode = 400;
    message = "Malformed JSON payload.";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack
  });
};
