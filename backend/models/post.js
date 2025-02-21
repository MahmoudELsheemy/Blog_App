const mongoose = require("mongoose");
const joi = require("joi");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 500,
    },
    image: {
      type: Object,
      default: {
        url: "",
        public_id: null,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//populate comment for post
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId",
});
const Post = mongoose.model("Post", postSchema);

//validate post
function validatePost(post) {
  const schema = joi.object({
    title: joi.string().min(3).max(50).required(),
    description: joi.string().min(3).max(500).required(),
    image: joi.object({
      url: joi.string(),
      public_id: joi.string(),
    }),
    category: joi.string().required(),
  });
  return schema.validate(post);
}

//validate update post
function validateUpdatePost(post) {
  const schema = joi.object({
    title: joi.string().min(3).max(50).trim(),
    description: joi.string().min(3).max(500).trim(),
    image: joi.object({
      url: joi.string(),
      public_id: joi.string(),
    }),
    category: joi.string(),
  });
  return schema.validate(post);
}

module.exports = { Post, validatePost, validateUpdatePost };
