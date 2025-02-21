const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require("bcryptjs");
const path = require("path");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
  cloudinaryDeleteAllImg,
} = require("../utils/cloudinary");
const fs = require("fs");
const { Post } = require("../models/post");
const { Comment } = require("../models/comment");

// @desc Get all users
// @route GET /api/users
// @access Private
module.exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("posts");
  res.status(200).json(users);
});

// @desc Get all users
// @route GET /api/users/profile/:id
// @access Private
module.exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("posts");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
});

// @desc update user
// @route PUT /api/users/profile/:id
// @access Private
module.exports.updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .select("-password")
    .populate("posts");
  res.status(200).json(updatedUser);
});

// @desc count users
// @route GET /api/users/count
// @access Private
module.exports.countUsers = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

// @updte photo user
// @route GET /api/users/profile/:id
// @access Private(only login user)
module.exports.updatePhoto = asyncHandler(async (req, res) => {
  //validation
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  //get the path of the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  //upload the image to cloudinary
  const result = await cloudinaryUploadImg(imagePath);
  //GET USER FROM THE DATABASE
  const user = await User.findById(req.user._id);
  //delete the image from cloudinary
  if (user.image.public_id !== null) {
    await cloudinaryDeleteImg(user.image.public_id);
  }
  //update the image in the database
  user.image = {
    url: result.secure_url,
    public_id: result.public_id,
  };
  await user.save();
  //delete the image from the server
  fs.unlinkSync(imagePath);
  res.status(200).json({
    message: "Image uploaded successfully",
    image: { url: result.secure_url, public_id: result.public_id },
  });
});

// @delete user
// @route GET /api/users/profile/:id
// @access Private(only admin)
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  //delete the image from cloudinary
  if (user.image.public_id !== null) {
    await cloudinaryDeleteImg(user.image.public_id);
  }

  //delete the posts from cloudinary

  const posts = await Post.find({ user: user._id });
  const poplicIds = posts.map((post) => post.image.public_id);

  if (poplicIds.length > 0) {
    await cloudinaryDeleteAllImg(poplicIds);
  }

  //delete the posts from the database
  await Post.deleteMany({ user: user._id });
  //delete the comments from the database
  await Comment.deleteMany({ user: user._id });
  //delete the user from the database
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "User deleted successfully" });
});
