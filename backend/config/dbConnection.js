const mongoose = require('mongoose');


const connectDB = async ()=>{
    let DB_URL=process.env.DB_URL;
    // if(process.env.NODE_ENV==="DEVELOPMENT"){DB_URL=process.env.DB_URL;}
    // if(process.env.NODE_ENV==="PRODUCTION"){DB_URL=process.env.DB_URL;}

    mongoose.connect(DB_URL)
    .then((con)=>{
        // console.log(`Connected to ${con?.connection?.host}`);
        console.log("Connected To DataBase Succesfully :)");
    })
    // .catch((err)=>{
    //     console.log('Error connecting to DB');
    // })

}
module.exports = connectDB;