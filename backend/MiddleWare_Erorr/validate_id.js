//middele ware for validate id
const mongoose = require("mongoose");
const validate_id = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "invalid id " });
    }
    next();
};
module.exports =  validate_id ;

