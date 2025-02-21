const mongoose = require("mongoose");

const VertificationEmailSchema = new mongoose.Schema(
  {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VertificationEmail = mongoose.model(
  "VertificationEmail",
  VertificationEmailSchema
);

module.exports =  VertificationEmail ;


//npm i nodeEmailer
