const express = require("express");
const router = express.Router();
const { isUserAuthenticated,authroziedRole } = require("../middleware/auth.js");
const {newOrder,getOrderDetails,myOrder,allOrderList,upadateOrderList,deleteOrder} = require("../controllers/orderController.js")

router.route('/orders/new').post(isUserAuthenticated,newOrder);
router.route('/me/orders/:id').get(isUserAuthenticated,getOrderDetails);
router.route('/me/orders').get(isUserAuthenticated,myOrder);
router.route('/admin/orders').get(isUserAuthenticated,authroziedRole("admin"),allOrderList);

router.route('/admin/orders/:id')
.put(isUserAuthenticated,authroziedRole("admin"),upadateOrderList)
.delete(isUserAuthenticated,authroziedRole("admin"),deleteOrder);


module.exports = router;

