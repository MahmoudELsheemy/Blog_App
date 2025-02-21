const router = require("express").Router();

const {
  forgotPassword,
  getresetPasswordLink,
  resetPassword,
} = require("../Controles/passwordControl");

router.post("/reset-password-link", forgotPassword);
router.route("/reset-password/:id/:token")
.get(getresetPasswordLink)
.post(resetPassword)

module.exports = router;
