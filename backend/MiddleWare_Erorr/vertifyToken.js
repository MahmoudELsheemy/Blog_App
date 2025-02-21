const jwt = require("jsonwebtoken");
const User = require("../models/User");

//vertify token
const vertifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

//vertify token & admin
const vertifyTokenAndAdmin = (req, res, next) => {
  vertifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  });
};

//vertify token & only user himself can access his profile
const verifyTokenAndUser = (req, res, next) => {
  vertifyToken(req, res, () => {
    if (req.user && String(req.user._id) === String(req.params.id)) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  });
};

const verifyTokenUserAndAdmin = (req, res, next) => {
  vertifyToken(req, res, () => {
    if (req.user && String(req.user._id) === String(req.params.id)|| req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  });
};

module.exports = { vertifyToken, vertifyTokenAndAdmin, verifyTokenAndUser , verifyTokenUserAndAdmin };
