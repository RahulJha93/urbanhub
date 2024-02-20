const express = require("express");
const router = express.Router();
const {
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
  deleteUser
} = require("../controllers/authController.js");
const { isUserAuthenticated,authroziedRole } = require("../middleware/auth.js");


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isUserAuthenticated, getUserProfile);
router.route("/me/update").get(isUserAuthenticated, updateprofile);
router.route("/password/update").put(isUserAuthenticated, updatePassword);

router.route("/admin/users").get(isUserAuthenticated,authroziedRole('admin'), allUsers);
// router.route("/admin/Details/:id").get(isUserAuthenticated,authroziedRole('admin'), userDetails);
// router.route("/admin/updateUser/:id").put(isUserAuthenticated,authroziedRole('admin'), updateUser);
// router.route("/admin/deleteUser/:id").delete(isUserAuthenticated,authroziedRole('admin'), deleteUser);

router.route("/admin/users/:id")
.get(isUserAuthenticated,authroziedRole('admin'), userDetails)
.put(isUserAuthenticated,authroziedRole('admin'), updateUser)
.delete(isUserAuthenticated,authroziedRole('admin'), deleteUser);


module.exports = router;
