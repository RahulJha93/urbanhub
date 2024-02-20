const mongoose = require('mongoose');
const data = require('./data.js');
const Product = require('../models/products.js');

const seedProducts = async ()=>{
    try {
        await mongoose.connect("mongodb+srv://rahulsahyog:roVimHbxCjibWBsQ@cluster0.rozqtvw.mongodb.net/?retryWrites=true&w=majority"
        );
        await Product.deleteMany();
        console.log("All Products are deleted");

        await Product.insertMany(data.products);
        console.log("Product successfully Added");

        process.exit();

        
    } catch (error) {
        console.log(error.message);
        process.exit();
        
    }

}
seedProducts();