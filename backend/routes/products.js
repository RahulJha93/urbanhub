const express = require('express');
const {getProducts,newProducts,getProductDetail,updateProducts,deleteProducts} = require('../controllers/productsControllers.js');
const router=express.Router();
const {isUserAuthenticated,authroziedRole} = require("../middleware/auth.js");

//public routes or user routes

router.route('/products').get(getProducts);
router.route('/products/:id').get(getProductDetail);

//protected routes or admin routes

router.route('/admin/newproducts').post(isUserAuthenticated,authroziedRole('admin'),newProducts);
router.route('/admin/products/:id').put(isUserAuthenticated,authroziedRole('admin'),updateProducts);
router.route('/admin/products/:id').delete(isUserAuthenticated,authroziedRole('admin'),deleteProducts);

module.exports = router;

