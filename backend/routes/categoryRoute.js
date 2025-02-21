const router = require("express").Router();
const validate_id = require("../MiddleWare_Erorr/validate_id");


const { createCategory, getAllCategories,deleteCategory } = require("../Controles/categoryControl"); 

const {
  vertifyToken,
  vertifyTokenAndAdmin,
} = require("../MiddleWare_Erorr/vertifyToken");
const { route } = require("./authRoute");

router.route("/").post( vertifyTokenAndAdmin, createCategory)
.get( getAllCategories);

router.route("/:id").delete( validate_id,vertifyTokenAndAdmin, deleteCategory)

module.exports = router;