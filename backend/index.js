const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errorMiddleware.js");

// if(process.env.NODE_ENV !== "PRODUCTION"){
dotenv.config({ path: "backend/.env" });
// } //This Line is Needed when .env file is not in the root directory(URBANHUB).

//handle uncaught exceptions Ex:Undefined Variable like "port is not defined"
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

// console.log(hello);

const connectDB = require("./config/dbConnection.js");

const app = express();
const port = process.env.PORT || 8000;

connectDB();
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true, optionSuccessStatus: 200 }));
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(cookieParser());

//Import all routes
const products = require("./routes/products.js");
const auth = require("./routes/auth.js");
const orders = require("./routes/orders.js");
const payments = require("./routes/payment.js");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", orders);
app.use("/api/v1/", payments);

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
