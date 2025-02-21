const asyncHandler = require("express-async-handler");
const { Post, validatePost, validateUpdatePost } = require("../models/post");
const { Comment } = require("../models/comment");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");

// @desc create post
// @route POST /api/posts
// @access Private
module.exports.createPost = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validatePost(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //validation image
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  //upload the image to cloudinary
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImg(imagePath);
  //create post
  const post = await Post.create({
    title: req.body.title,
    description: req.body.description,
    image: {
      url: result.secure_url,
      public_id: result.public_id,
    },
    category: req.body.category,
    user: req.user._id,
  });
  //delete the image from the server
  fs.unlinkSync(req.file.path);
  res.status(200).json({
    post,
    message: "Post created successfully",
  });
});

// @desc Get all posts
// @route GET /api/posts
// @access Private
module.exports.getAllPosts = asyncHandler(async (req, res) => {
  const { category, page } = req.query;
  let posts = [];
  const Post_limit = 4;
  const Post_skip = (page - 1) * Post_limit;

  if (page) {
    posts = await Post.find()
      .skip(Post_skip)
      .limit(Post_limit)
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  } else if (category) {
    posts = await Post.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  } else {
    posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "-password");
  }

  res.status(200).json(Array.isArray(posts) ? posts : []);
});

// @desc Get single post
// @route GET /api/posts/:id
// @access Private
module.exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("user", "-password")
    .populate("comments");
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json(post ? post : []);
});

//get count posts
module.exports.countPosts = asyncHandler(async (req, res) => {
  const count = await Post.countDocuments();
  res.status(200).json(count);
});

// @desc update post
// @route PUT /api/posts/:id
// @access Private
module.exports.updatePost = asyncHandler(async (req, res) => {
  const { error } = validateUpdatePost(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (String(req.user._id) !== String(post.user)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this post" });
  }
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate("user", "-password").populate("comments");

  res.status(200).json(updatedPost);
});
// @desc update image post
// @route PUT /api/posts/:id
// @access Private
module.exports.updateImagePost = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (String(req.user._id) !== String(post.user)) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this post" });
  }
  //delete the image from cloudinary
  await cloudinaryDeleteImg(post.image.public_id);
  //upload the image to cloudinary
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImg(imagePath);

  //update the image in the database
  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    {
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    },
    {
      new: true,
    }
  )
  //delete the image from the server
  fs.unlinkSync(imagePath);
  res.status(200).json({
    updatedPost,
    message: "Image uploaded successfully",
    image: { url: result.secure_url, public_id: result.public_id },
  });
});

// @desc delete post
// @route DELETE /api/posts/:id
// @access Private
module.exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (req.user.isAdmin || String(req.user._id) === String(post.user)) {
    //delete the image from cloudinary
    if (post.image.public_id !== null) {
      await cloudinaryDeleteImg(post.image.public_id);
    }
    //delete the comments from the database
    await Comment.deleteMany({ post: post._id });

    //delete the post from the database
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" , postId: req.params.id});
  } 
  else {
    res
      .status(403)
      .json({ message: "You are not authorized to delete this post" });
  }
});

// @desc toggle like
// @route PUT /api/posts/like/:id
// @access Private
module.exports.toggleLike = asyncHandler(async (req, res) => {
  let post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  if (!post.likes.includes(req.user._id)) {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: { likes: req.user._id },
      },
      { new: true }
    ).populate("user", "-password");
  } else {
    post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user._id },
      },
      { new: true }
    );
  }
  res.status(200).json({ post, message: "Post updated successfully" });
});
