const express = require("express");
const router = express.Router();
const { isUserAuthenticated,authroziedRole } = require("../middleware/auth.js");
const StripeCheckOutSession = require("../controllers/paymentController.js");

router.route("/payment/checkout").post(isUserAuthenticated,StripeCheckOutSession);``

module.exports = router;
