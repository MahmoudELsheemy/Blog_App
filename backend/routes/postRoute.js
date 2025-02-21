const router = require("express").Router();
const upload = require("../MiddleWare_Erorr/photo_update");

const { createPost, getAllPosts,getPostById, countPosts,deletePost,updatePost,updateImagePost,toggleLike  } = require("../Controles/postControl");

const {
  // vertifyTokenAndAdmin,
  vertifyToken,
  verifyTokenAndUser,
} = require("../MiddleWare_Erorr/vertifyToken");

const validate_id = require("../MiddleWare_Erorr/validate_id");

router.route("/").post(vertifyToken, upload.single("image"), createPost)
.get( getAllPosts)

router .route("/count").get( countPosts);


router
  .route("/:id")
  .get(validate_id,getPostById)
  .delete( validate_id, vertifyToken,deletePost)
  .put(validate_id, vertifyToken, updatePost);

router.route("/updateImage/:id").put(validate_id,  vertifyToken,upload.single("image"),updateImagePost);
router.route("/like/:id").put(validate_id, vertifyToken, toggleLike);

module.exports = router;
