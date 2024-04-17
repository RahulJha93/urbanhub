const mongoose = require("mongoose");
// const Product = require("../models/products/Product.js");

const orderSchema = mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phoneNo: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India', required: true },
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },// this helps to get name.and all other deatils of user db for frontend
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: [String], required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    paymentsMethod: {
      type: String,
      required: true,
      enum: {
        values: ["COD", "CARD"],
        message: "Please select card or cod",
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    shippingAmount: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: {
        values: ["processing", "shipped", "delivered"],
        message: "please select correct order status",
      },
      default: "processing",
    },
    deliverAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;