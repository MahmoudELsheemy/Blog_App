const mongoose = require("mongoose");
const joi = require("joi");



const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
    },
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
},
    { timestamps: true }

);

const Comment = mongoose.model("Comment", commentSchema);

const validateComment = (comment) => {
    const schema = joi.object({
        content: joi.string().required(),
        postId: joi.string().required().label("Post ID"),
    });
    return schema.validate(comment);
};

//upadate comment
const updateComment = (comment) => {
    const schema = joi.object({
        content: joi.string().required(),
    });
    return schema.validate(comment);
};

module.exports = { Comment, validateComment, updateComment };
