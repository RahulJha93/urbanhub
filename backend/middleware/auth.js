const AsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// check if user is authenticate or not

const isUserAuthenticated = AsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);

  if (!token) {
    return next(new ErrorHandler("Login First To view this content", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SCERET);
  // console.log(decoded);
  req.user = await User.findById(decoded.id);
  // console.log( req.user);
  next();
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
