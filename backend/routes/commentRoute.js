const router = require("express").Router();

const { createComment, getAllComments,deleteComment,updateComment } = require("../Controles/CommentControl"); 

const {
  vertifyToken,
  vertifyTokenAndAdmin,
} = require("../MiddleWare_Erorr/vertifyToken");

const validate_id = require("../MiddleWare_Erorr/validate_id");

router.route("/").post(vertifyToken, createComment).get(vertifyToken, vertifyTokenAndAdmin, getAllComments);

router.route("/:id").delete(validate_id,vertifyToken, deleteComment)
.put(validate_id,vertifyToken, updateComment);


module.exports = router;
