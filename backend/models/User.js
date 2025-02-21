const mongoose = require("mongoose");
const joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    image: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        public_id: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAcountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//populate posts of the user   علشان يعرض للمستخدم البيانات الخاصة بك عند الحاجه اذا وجدت
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

//Auth token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    email: joi.string().min(8).max(100).required().email(),
    password: joi.string().min(8).required(),
    image: joi.object({
      url: joi.string(),
      public_id: joi.string(),
    }),
    bio: joi.string(),
    isAdmin: joi.boolean(),
  });
  return schema.validate(user);
}

function validateUserLogin(user) {
  const schema = joi.object({
    email: joi.string().min(8).max(100).required().email(),
    password: joi.string().min(8).required(),
  });
  return schema.validate(user);
}

//validate update user
function validateUpdateUser(user) {
  const schema = joi.object({
    name: joi.string().min(3).max(50).trim(),
    password: joi.string().min(8),
    bio: joi.string(),
  });
  return schema.validate(user);
}

//validate email 

function validateEmail(user) {
  const schema = joi.object({
    email: joi.string().min(8).max(100).required().email(),
  });
  return schema.validate(user);
}

//validate new password
function validateNewPassword(user) {
  const schema = joi.object({
    password: joi.string().min(8).required(),
  });
  return schema.validate(user);
}
module.exports = { User, validateUser, validateUserLogin, validateUpdateUser, validateEmail, validateNewPassword };
