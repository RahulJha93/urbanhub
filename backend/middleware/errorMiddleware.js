// const error = require('../utils/errorHandler.js');

const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server error",
  };

  //handle mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    error = new ErrorHandler(message, 400);
  }

  //handle wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON web token is not valid. Try again!!!";
    error = new ErrorHandler(message, 400);
  }

  //handle expired jwt error
  if (err.name === "TokenExpiredError") {
    const message = "JSON web token is expired. Try again!!!";
    error = new ErrorHandler(message, 400);
  }

  //handle invalid mongoose id
  if (err.name === "CastError") {
    const message = `Resource not found .${err?.path}`;
    error = new ErrorHandler(message, 400);
  }

  //handle validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(message, 400);
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    res.status(error.statusCode).json({
      message: error.message,
    });
  }
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(error.statusCode).json({
      message: error.message,
      error: err,
      stack: err?.stack,
    });
  }
};
module.exports = errorMiddleware;
