const asyncHandler = require("express-async-handler");
const { Category, validateCategory } = require("../models/category");

// @desc create category
// @route POST /api/categories
// @access Private
module.exports.createCategory = asyncHandler(async (req, res) => {
  //Validation
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  }
  //create category
  const category = await Category.create(req.body);
  res.status(200).json({ category, message: "Category created successfully" });
});

// @desc Get all categories
// @route GET /api/categories
// @access Private
module.exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

// @desc Get category by id
// @route GET /api/categories/:id
// @access Private
module.exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ category });
});

// @desc delete category
// @route DELETE /api/categories/:id
// @access Private
module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Category deleted successfully",
    categoryId: req.params.id,
  });
});
