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

const allowedOrigins = ["https://urbanhub.vercel.app", "http://localhost:5173"];

connectDB();

app.use(bodyParser.json());

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(
  express.json({
    limit: "10mb",
  })
);
const options = {
  expires: new Date(
    Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  secure: true, // Set to true if your using https
  sameSite: 'None', // Allows cross-site cookies
  domain:"https://urbanhub.vercel.app",
  credentials:"include"

};
app.use(cookieParser(options));

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
  console.log(`Serving running on port ${port}`);
});

//Handle Unhandle Promise Rejections Ex:spelling mistake in monngodb url
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting Server due to Unhandled Promise Rejections");
  server.close(() => {
    process.exit(1);
  });
});
