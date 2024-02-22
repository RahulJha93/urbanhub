const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware.js");
dotenv.config({ path: "backend/config/config.env" }); //This Line is Needed when .env file is not in the root directory(URBANHUB).


//handle uncaught exceptions Ex:Undefined Variable like "port is not defined"
process.on("uncaughtException", (err)=>{
   console.log( `Error: ${err}` );
   console.log("Shutting down due to uncaught exception");
   process.exit(1);
});

// console.log(hello);


const connectDB = require("./config/dbConnection.js");

const app = express();
const port = process.env.PORT;


connectDB();
app.use(cors({
  origin: 'http://localhost:8000',
  credentials: true, // If you're using cookies or sessions
  useSuccessStatus: 200
}));
app.use(express.json());
app.use(cookieParser());

//Import all routes
const products = require("./routes/products.js");
const auth = require("./routes/auth.js");
const orders = require("./routes/orders.js");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", orders);

//using error middleware
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`Serving running on port ${port} in ${process.env.NODE_ENV}`);
});

//Handle Unhandle Promise Rejections Ex:spelling mistake in monngodb url
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting Server due to Unhandled Promise Rejections");
  server.close(() => {
    process.exit(1);
  });
});
