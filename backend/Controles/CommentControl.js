const asyncHandler = require("express-async-handler");
const {
  Comment,
  validateComment,
  updateComment,
} = require("../models/comment");
const { Post } = require("../models/post");
const { User } = require("../models/User");

// @desc create comments
// @route GET /api/comments
// @access Private
module.exports.createComment = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateComment(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  const profile = await User.findById(req.user._id);
  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }
  const post = await Post.findById(req.body.postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  //create comment
  const comment = await Comment.create({
    ...req.body,
    user: req.user._id,
    name: profile.name,
  });
  res.status(200).json(comment);
});

// @desc Get all comments
// @route GET /api/comments
// @access Private (Admin)
module.exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user", "-password");
  res.status(200).json(comments);
});

// @desc Delete comments
// @route GET /api/comments
// @access Private (Admin or user)
module.exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (req.user.isAdmin || String(req.user._id) === String(comment.user)) {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to delete this comment" });
  }
});

// @desc update comments
// @route GET /api/comments
// @access Private ( user)
module.exports.updateComment = asyncHandler(async (req, res) => {
  const { error } = updateComment(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (String(req.user._id) === String(comment.user)) {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedComment);
  } else {
    res
      .status(403)
      .json({ message: "You are not authorized to update this comment" });
  }
});
