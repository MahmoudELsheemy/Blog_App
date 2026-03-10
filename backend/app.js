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

// CORS
// استبدل كل إعدادات CORS الحالية بهذا الكود في بداية الملف بعد app.use(express.json())

// السماح مؤقتاً بكل الأصول (للتجربة)
app.use(cors({
  origin: true, // يسمح بأي origin مع credentials
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
}));

// معالجة طلبات OPTIONS يدوياً
app.options('*', cors());

// middleware إضافي للتأكد من الـ headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://blog-app-front-dq1f.onrender.com');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});


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
// أضف هذا قبل routes
app.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Blog API is working!',
    endpoints: {
      auth: '/api/auth',
      posts: '/api/posts',
      categories: '/api/categories',
      comments: '/api/comments'
    }
  });
});
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
