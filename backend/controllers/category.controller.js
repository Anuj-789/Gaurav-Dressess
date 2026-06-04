const Category = require("../models/category.model");

// CREATE
const addCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      image: req.body.image || "",
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.name = req.body.name || category.name;

    if (req.body.image !== undefined) {
      category.image = req.body.image;
    }

    await category.save();

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.json({
      message: "Category deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};