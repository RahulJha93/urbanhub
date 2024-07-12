//create a token and save in cookie.
const generateToken=require('../config/generateToken.js');

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'None', // Allow cross-site cookies
    secure: process.env.NODE_ENV === 'PRODUCTION', // Only send cookies over HTTPS in production
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
