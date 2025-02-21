const asyncHandler = require("express-async-handler");
const { User, validateNewPassword, validateEmail } = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utiles/sendEmail");
const crypto = require("crypto");
const VertificationEmail = require("../models/verticationModel");

// @desc Register new user
// @route POST /api/users
// @access Public
module.exports.forgotPassword = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateEmail(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //check if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }

  //creating new verication code && save it in the database
  let verificationCode = await VertificationEmail.findOne({
    id: user._id,
  });
  if (!verificationCode) {
    verificationCode = new VertificationEmail({
      id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationCode.save();
  }
  //making the link to verify the email
  const link = `http://localhost:3000/reset-password/${user._id}/${verificationCode.token}`;
  //send email
  const html = `
    <h1>Hello ${user.name}</h1>
    <p>Click on the link below to reset your password.</p>
    <a href="${link}">${link}</a>
    `;
  await sendEmail(user.email, "Reset your password", html);
  res
    .status(200)
    .json({ message: "we have sent you an email to reset your password" });
});

// @desc reset password link
// @route GET /api/reset-password/:id/:token
// @access Public
module.exports.getresetPasswordLink = asyncHandler(async (req, res) => {
  //check if user exist
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }
  //check verification code
  const verificationCode = await VertificationEmail.findOne({
    id: user._id,
    token: req.params.token,
  });
  if (!verificationCode) {
    return res.status(400).json({ message: "Invalid link" });
  }
  //send email
  res
    .status(200)
    .json({ message: "vaild url" });
});



// @desc reset password
// @route GET /api/reset-password/:id/:token
// @access Public
//@method Post

module.exports.resetPassword = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateNewPassword(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //check if user exist
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }

  //check verification code
  const verificationCode = await VertificationEmail.findOne({
    id: user._id,
    token: req.params.token,
  });
  if (!verificationCode) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  if (!user.isAcountVerified) {
      user.isAcountVerified = true;
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //update password
  user.password = hashedPassword;
  await user.save();
  await VertificationEmail.deleteOne({ _id: verificationCode._id });
  //send email
  const html = `
    <h1>Hello ${user.name}</h1>
    <p>Your password has been changed successfully.</p>
    `;
  await sendEmail(user.email, "Password changed successfully", html);
  res
    .status(200)
    .json({ message: "Your password has been changed successfully." });
});
