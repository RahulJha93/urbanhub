const asyncHandler = require("express-async-handler");
const Order = require("../models/orders.js");
const ErrorHandler = require("../utils/errorHandler.js");
const Product = require("../models/products.js");

//new order - api/v1/orders/new
const newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentsMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentsMethod,
    paymentInfo,
    user: req.user._id,
  });
  res.status(200).json({
    order,
  });
});

//get order details - api/v1/orders/:id
const getOrderDetails = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler("No Order found for id " + req.params.id, 404)
    );
  }
  res.status(200).json({
    order,
  });
});

//get current user's order list - api/v1/me/orders
const myOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler("No Order found for id " + req.params.id, 404)
    );
  }
  res.status(200).json({
    order,
  });
});

//get all order list - api/v1/admin/orders
const allOrderList = asyncHandler(async (req, res, next) => {
  const order = await Order.find();

  res.status(200).json({
    order,
  });
});

//update order list - api/v1/admin/orders/:id
const upadateOrderList = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No Order found", 404));
  }
  if (order?.orderStatus === "delivered") {
    return next(new ErrorHandler("Order is already delivered", 400));
  }
  //update product stock
  order?.orderItems.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found", 404));
    }
    console.log(product.stock);
    product.stock = product.stock - item.quantity;
    await product.save({validateBeforeSave: false});
    console.log(product.stock);
  });
  console.log(req?.body?.status);

    order.orderStatus = req?.body?.status;
    order.deliveredAt = Date.now();
    await order.save();


  res.status(200).json({
    success:true,
  });
});

// delete order - api/v1/admin/orders/:id

const deleteOrder = asyncHandler(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);
  if(!order){
    return next(new ErrorHandler("Order not found",404));
  }
  await order.deleteOne();
  res.status(200).json({
    success: true,
  })
  

});

module.exports = { newOrder, getOrderDetails, myOrder, allOrderList,upadateOrderList ,deleteOrder};
