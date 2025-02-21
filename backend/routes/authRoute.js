const express = require("express");
const { registerUser, loginUser,vertifyEmail} = require("../Controles/authControl");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id/vertify/:token",vertifyEmail)



module.exports = router;
