const globalEroor = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  err.status = err.status || "error";
  err.stack = err.stack || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Error(message);
    err.statusCode = 404;
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Error(message);
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid. Try again`;
    err = new Error(message);
    err.statusCode = 400;
  }

  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired. Try again`;
    err = new Error(message);
    err.statusCode = 400;
  }

  if (err.name === "SequelizeValidationError") {
    const message = `Json Web Token is expired. Try again`;
    err = new Error(message);
    err.statusCode = 400;
  }

  if (err.name === "SequelizeDatabaseError") {
    const message = `Json Web Token is expired. Try again`;
    err = new Error(message);
    err.statusCode = 400;
  }


  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, res);
  }
};

const sendErrorProd = (err, res) => {
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    status: err.status,
  });
};
const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = globalEroor;
