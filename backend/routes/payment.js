const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { isUserAuthenticated,authroziedRole } = require("../middleware/auth.js");
const {StripeCheckOutSession,stripeWebhook} = require("../controllers/paymentController.js");

router.route("/payment/checkout").post(isUserAuthenticated,StripeCheckOutSession);
router.route('/payment/webhook').post(stripeWebhook);

module.exports = router;
