const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const globalEroor = require("./MiddleWare_Erorr/Erorr_express");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
// const ApiError = require("./utiles/apiErorr");
dotenv.config();
const connection_db = require("./config/Connect_db"); 

// app express
const app = express();


require("dotenv").config();

//security (prevent parameter pollution)
app.use(hpp());

//middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ${process.env.NODE_ENV}`);
}
//security
app.use(helmet());

//security
app.use(xss());

//rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//connect db
connection_db();

//routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));
//not found
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on this server!`,
  });
  next();
});

//error middleware(internal exceptions)
app.use(globalEroor);

//error middleware(external exceptions)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`Shutting down the server due to unhandled promise rejection`);
    process.exit(1);
  });
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.NODE_ENV} ${PORT}`);
});

//Resource usage for postman test
//npm i cors

//securtiy
//xss Atack
//npm i xss-clean
