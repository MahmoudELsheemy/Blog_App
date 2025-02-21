const expresss = require("express");
const validate_id = require("../MiddleWare_Erorr/validate_id");
const upload = require("../MiddleWare_Erorr/photo_update");
const {
  getAllUsers,
  getUserById,
  updateUser,
  countUsers,
  updatePhoto,
  deleteUser,
} = require("../Controles/usersControl");

const {
  vertifyTokenAndAdmin,
  verifyTokenAndUser,
  vertifyToken,
  verifyTokenUserAndAdmin,
} = require("../MiddleWare_Erorr/vertifyToken");

const router = expresss.Router();

router.route("/profile").get(vertifyTokenAndAdmin, getAllUsers);

router.route("/count").get(vertifyTokenAndAdmin, countUsers);

router
  .route("/profile/photo")
  .post(vertifyToken, upload.single("image"), updatePhoto);

router
  .route("/profile/:id")
  .get(validate_id, getUserById)
  .put(validate_id, verifyTokenAndUser, updateUser)
  .delete(validate_id, verifyTokenUserAndAdmin, deleteUser);

module.exports = router;
