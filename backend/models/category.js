const mongoose = require("mongoose");
const joi = require("joi");

const categorySchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    }

    ,{timestamps: true}

);

const Category = mongoose.model("Category", categorySchema);


    function validateCategory(category) {
        const schema=joi.object({
            name:joi.string().min(3).max(50).required().label("Category Name"),
        });
        return schema.validate(category);
    }

 module.exports={Category,validateCategory};  
