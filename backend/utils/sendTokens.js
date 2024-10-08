//create a token and save in cookie.
const generateToken=require('../config/generateToken.js');

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
 

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // Set to true if your using https
    sameSite: 'None', // Allows cross-site cookies
    credentials:"include"

  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  })
  // res.session.token = token;
};

module.exports = sendToken;