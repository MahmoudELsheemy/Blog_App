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
const path = require("path");

// أول حاجة: middleware عامة
app.use(express.json());
app.use(hpp());
app.use(helmet());
app.use(xss());
app.use(cors({
    origin: 'https://blog-app-front-dq1f.onrender.com',
    credentials: true
}));

const limiter = rateLimit({ windowMs: 15*60*1000, max:100 });
app.use(limiter);

// بعدين routes الـ API
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// بعد كل الـ API، نخلي build للـ frontend
app.use(express.static(path.join(__dirname, "../front/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../front/build/index.html"));
});

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
