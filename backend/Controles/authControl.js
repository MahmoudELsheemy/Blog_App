const asyncHandler = require("express-async-handler");
const { User, validateUser, validateUserLogin } = require("../models/User");
const bcrypt = require("bcryptjs");
const VertificationEmail = require("../models/verticationModel");
const crypto = require("crypto");
const sendEmail = require("../utiles/sendEmail");

// @desc Register new user
// @route POST /api/users
// @access Public

module.exports.registerUser = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //check if user exist
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return res.status(400).json({ message: "user already exist" });
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //creating new verication code && save it in the database
  const verificationCode = new VertificationEmail({
    id:user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationCode.save();
  //making the link to verify the email
  const link = `http://localhost:3000/users/${user._id}/vertify/${verificationCode.token}`;
  //Puting the link in the html template
  const html = `
    <div>
    <h1>Verify your email</h1>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify your email</a>
  </div>
`;
  //sending the email
  await sendEmail(user.email, "Verify your email", html);

  res.status(200).json({
    message: " we have sent you an email to verify your email",
  });
});

// @desc login new user
// @route POST /api/users
// @access Public

module.exports.loginUser = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateUserLogin(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //check if user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }

  //check password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password or email" });
  }
  //send email
  if (!user.isAcountVerified) {
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
    const link = `http://localhost:3000/users/${user._id}/vertify/${verificationCode.token}`;
    const html = `
    <div>
    <h1>Verify your email</h1>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify your email</a>
  </div>
`;
    await sendEmail(user.email, "Verify your email", html);

    return res
      .status(404)
      .json({ message: " we have sent you an email to verify your email " });
  }

  //create token
  const token = user.generateAuthToken();

  //send response
  res.status(200).json({
    _id: user._id,
    name: user.name,
    image: user.image,
    isAdmin: user.isAdmin,
    token,
    message: "user logged in successfully",
  });
});

// @desc vertify email
// @route GET /api/users/:id/verify/:token
// @access Public

module.exports.vertifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(400).json({ message: "user not exist" });
  }
  const vertificationCode = await VertificationEmail.findOne({
    id: req.params.id,
    token: req.params.token,
  });

  if (!vertificationCode) {
    return res.status(400).json({ message: "vertification code not exist" });
  }
  user.isAcountVerified = true;
  await user.save();

  //time is 5 seconds
  setTimeout(async () => {
    await VertificationEmail.deleteOne(vertificationCode._id);
  }, 3000);

  //AFTER VERIFYING THE EMAIL DELETE THE VERIFICATION CODE
  // await VertificationEmail.deleteOne(vertificationCode._id);

  res.status(200).json({ message: "email vertified successfully" });
});
