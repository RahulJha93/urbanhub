const Product = require("../models/products.js");
const APIFilters = require("../utils/apiFilter.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require("express-async-handler");

//display all products => api/v1/products
const getProducts = asyncHandler(async (req, res) => {
  const resPerPage = 4;

  const apiFilters = new APIFilters(Product, req.query).search().filters();
  let products = await apiFilters.query;
  let filteredProductCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  return res.status(200).json({
    resPerPage,
    filteredProductCount,
    products,
  });
});

// create new products => api/v1/admin/newproducts
const newProducts = asyncHandler(async (req, res) => {
  req.body[0].user = req.user._id;
  // console.log(req.body);
  const product = await Product.create(req.body);

  return res.status(200).json({
    product,
  });
});

// search product by id =>api/v1/products/:id
const getProductDetail = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).json({
    product,
  });
});

// update products => api/v1/admin/updateProduct/:id
const updateProducts = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

//delete Product => api/v1/admin/products/deleteProduct/:id
const deleteProducts = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.deleteOne();
  return res.status(200).json({
    message: "Product deleted successfully",
  });
});

//create/update Product review => api/v1/reviews
const createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
        product.numOfReviews = product.reviews.length;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
  await product.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
  });
});

//get product reviews
const getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    reviews: product.reviews,
  });
});

//delete product reviews
const deleteProductReview = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product?.reviews?.filter(
    (review) => review._id.toString() === req?.query?.id.toString()
  );

  const numOfReviews = product.reviews.length;
  product.reviews.length;

  const ratings =
    numOfReviews == 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await Product.findByIdAndUpdate(
    req.query.id,
    { reviews, numOfReviews, ratings },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    product,
  });
});

module.exports = {
  getProducts,
  newProducts,
  getProductDetail,
  updateProducts,
  deleteProducts,
  createProductReview,
  getProductReviews,
  deleteProductReview,
};
