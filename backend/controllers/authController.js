const asyncHandler = require("express-async-handler");
const User = require("../models/users.js");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/sendTokens.js");
const sendMail = require("../utils/sendMail.js");
const getResetPasswordTemplate = require("../utils/emailTemplate.js");
const crypto = require("crypto");
const uploadFiles = require("../utils/cloudinary.js");

// create a new user => api/v1/register
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if(password.length < 6) {
    return next(new ErrorHandler("Please Enter Password greater than 6 ", 400));
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendToken(user, 201, res);
});

// Login a  user => api/v1/login

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter Email And Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  
  sendToken(user, 200, res);


});

//logout a user => api/v1/logout

const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logout successfully",
  });
});

//upload user avatar => api/v1/me/upload_avatar
const uploadAvatar = asyncHandler(async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const avatarResponse = await uploadFiles(dataURI,"URBANHUB-ECOMMERCE/AVATARS");
  
  console.log(req.file);
  console.log("=========");
  console.log(avatarResponse);

  const user = await User.findByIdAndUpdate(req?.user?._id,{
    avatar:avatarResponse,
  });
  console.log(user);

  res.status(200).json({
    user,
  });

  
});

//forgot password
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  //get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save();
  // console.log(resetToken);

  // create reset password url
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);
  // console.log(message);
  // console.log(user);
  try {
    await sendMail({
      email: user.email,
      subject: "UrbanHub Password Recovery",
      message,
    });
    res.status(200).json({
      message: `Email sent to:${user.email}`,
    });
  } catch (error) {
    user.getResetPasswordToken = undefined;
    user.getResetPasswordExpire = undefined;

    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
  // sendToken(user, 200, res);
});

//reset password  api/v1/password/reset/:token
const resetPassword = asyncHandler(async (req, res, next) => {
  // hash the url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req?.params?.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is Invalid or has been expired",
        404
      )
    );
  }
  // Check if the password entered is same
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  // Set new password
  const newhashedPassword = await bcrypt.hash(req.body.password, 10);

  user.password = newhashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  // console.log(user);

  sendToken(user, 200, res);
});

//Get current user profiles =>/api/v1/me
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req?.user?.id);
  

  res.status(200).json({
    user,
  });
});

// update password =>/api/v1/password/update
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req?.user?.id).select("+password");

  //check previous password
  const isPasswordMatched = await bcrypt.compare(
    req?.body?.oldPassword,
    user.password
  );
  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password mismatch", 400));
  }
  const newhashedPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.password = newhashedPassword;
  user.save();
  res.status(200).json({
    user,
  });
});

//update user profile  /api/me/update
const updateprofile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req?.user?._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

//get all users api/v1/admin/Users
const allUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});
//get user details api/v1/admin/Details/:id
const userDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("No User Found", 404));
  }
  res.status(200).json({
    user,
  });
});

//update user details  /api/admin/users/:id
const updateUser = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

//and Delete User api/v1/admin/users/:id
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  await user.deleteOne();
  res.status(200).json({
    success:true,
  });
});
module.exports = {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateprofile,
  allUsers,
  userDetails,
  updateUser,
  deleteUser,
  uploadAvatar,
};
