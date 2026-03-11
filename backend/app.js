const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const globalError = require("./MiddleWare_Erorr/Erorr_express");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

dotenv.config();
const connection_db = require("./config/Connect_db"); 

// app express
const app = express();

// ✅ CORS - ضع هذا في البداية
app.use(cors({
  origin: 'https://blog-app-front-dq1f.onrender.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ معالجة طلبات OPTIONS
app.options('*', cors());

// ✅ Middleware الأساسية
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Security Middleware
app.use(helmet());
app.use(xss());
app.use(hpp());

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// ✅ Morgan للـ logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ✅ الاتصال بقاعدة البيانات
connection_db();
// قبل routes
console.log('Current directory:', __dirname);
console.log('Routes folder exists:', require('fs').existsSync('./routes'));
console.log('Auth route exists:', require('fs').existsSync('./routes/authRoute.js'));
// ✅ routes - تأكد من المسارات الصحيحة
console.log('Loading routes...'); // للتأكد

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// ✅ Route للاختبار
app.get('/', (req, res) => {
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

// ✅ معالجة الـ 404
app.all("*", (req, res, next) => {
  console.log(`404: ${req.originalUrl}`); // للتتبع
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

// ✅ Error middleware
app.use(globalError);

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// ✅ معالجة الـ unhandled rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting down due to unhandled rejection");
    process.exit(1);
  });
});
