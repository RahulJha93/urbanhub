const Product = require("../models/products.js");
const ErrorHandler = require("../utils/errorHandler.js");
const asyncHandler = require('express-async-handler')


//display all products => api/v1/products
const getProducts = async (req, res) => {

  console.log(req?.user);

  // temp
  const product = await Product.find();
  return res.status(200).json({
    product,
  });
  
};

// create new products => api/v1/admin/newproducts
const newProducts = asyncHandler(async (req, res) => {
  
  req.body[0].user = req.user._id;
  console.log(req.body);
  const product = await Product.create(req.body);
  

      return res.status(200).json({
        product
      });
});

// search product by id =>api/v1/products/:id
const getProductDetail = asyncHandler(async (req, res,next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found",404))
      };

    return res.status(200).json({
      product,
    });
});

// update products => api/v1/admin/updateProduct/:id
const updateProducts = async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
};

//delete Product => api/v1/admin/products/deleteProduct/:id
const deleteProducts = async (req, res) => {
  let product = await Product.findById(req?.params?.id);

  try {
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    await product.deleteOne();
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    // res.status(404).json({
    //   error: "Something went wrong",
    // });
  }
};

module.exports = {
  getProducts,
  newProducts,
  getProductDetail,
  updateProducts,
  deleteProducts,
};
