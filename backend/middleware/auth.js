const AsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// check if user is authenticate or not

const isUserAuthenticated = AsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token)

  if (!token) {
    return next(new ErrorHandler("Login First To view this content", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
});

const authroziedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};

module.exports = { isUserAuthenticated, authroziedRole };
