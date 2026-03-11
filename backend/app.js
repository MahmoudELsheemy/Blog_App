const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const globalEroor = require("./MiddleWare_Erorr/Erorr_express");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path"); // ✅ أضف هذا للسطر
dotenv.config();
const connection_db = require("./config/Connect_db");

// app express
const app = express();

// ✅ تعديل CORS للنشر - أضف رابط الفرونت إند على Render
app.use(
  cors({
    origin: [
      "http://localhost:3000", 
      "http://localhost:3001",
      "https://blog-app-front-dq1f.onrender.com" // ✅ أضف رابط الفرونت إند
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ معالجة طلبات OPTIONS
app.options("*", cors());

require("dotenv").config();

//security
app.use(hpp());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ${process.env.NODE_ENV}`);
}

//security
app.use(helmet());
app.use(xss());

//rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
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

// ✅ route للاختبار (مهم جداً)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Blog API is working!",
    endpoints: {
      auth: "/api/auth",
      posts: "/api/posts",
      categories: "/api/categories",
      comments: "/api/comments"
    }
  });
});

//not found
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `can't find ${req.originalUrl} on this server!`,
  });
});

//error middleware
app.use(globalEroor);

//server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.NODE_ENV} ${PORT}`);
});

//unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log(`Shutting down the server due to unhandled promise rejection`);
    process.exit(1);
  });
});
