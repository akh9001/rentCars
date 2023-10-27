const Category = require('../models/category');
const Subcategory = require('../models/Subcategory');

const addCategory = async (req, res) => {
  try {
    const { category_name, active } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "No category name provided" });
    }

    // Check if a category with the same name already exists
    const existingCategory = await Category.findOne({ category_name });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCat = new Category({
      category_name,
      active: active || true, // Use a default value for "active" if not provided
    });

    const savedCat = await newCat.save();

    res.status(201).json({ message: "Category created successfully", savedCat });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Failed to add category" });
  }
};

const Pagination = (req) => {
  const pageNumber = !isNaN(req.query.page) ? parseInt(req.query.page) : 1;

  if (pageNumber < 1) {
    console.log("Invalid Page Number");
    // Handle the error, such as returning a response or throwing an error
  }

  const limitPerPage = 10;
  const skipVal = (pageNumber - 1) * limitPerPage;

  return {
    limitPerPage,
    skipVal
  };
};

const getAllCategories = async (req, res) => {
  try {
    const { limitPerPage, skipVal } = Pagination(req);
    const categories = await Category.find()
      .sort({ category_name: 1 }) // Use 1 for ascending order
      .limit(limitPerPage)
      .skip(skipVal);

    if (categories.length === 0) { // Check if no categories were found
      res.status(404).json({ message: 'No Categories found.' });
    } else {
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching categories.' });
  }
};

const searchCategory = async (req, res) => {
  try {
    const { limitPerPage, skipVal } = Pagination(req);
    const queryObject = req.query.category_name;

    const categories = await Category.find({ category_name: new RegExp(`^${queryObject}`, 'i') })
      .sort({ category_name: 1 }) // Use 1 for ascending order
      .limit(limitPerPage)
      .skip(skipVal);

    if (categories.length === 0) {
      res.status(404).json({ message: 'No Categories found.' });
    } else {
      res.status(200).json(categories);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while searching for categories.' });
  }
};

const getCategory = async (req, res) => {
  const idCat = req.params.id;
  try {
    const category = await Category.findById(idCat);
    if (!category) {
      return res.status(404).json({ message: 'No category found with the provided Id' });
    }
    res.status(200).json({ status: 200, data: category });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while fetching the category.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const idCat = req.params.id;
    const catUpdate = req.body;

    const cat = await Category.findByIdAndUpdate(idCat, catUpdate, { new: true }); // Use { new: true } to return the updated document

    if (cat) {
      res.status(200).json({ status: 200, message: "Category updated successfully", data: cat });
    } else {
      res.status(404).json({ message: "Invalid category id" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "An error occurred while updating the category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const idCat = req.params.id;

    // Check the existence of subCategories
    const subCategoryCount = await Subcategory.countDocuments({ categoryId: idCat });

    if (subCategoryCount > 0) {
      return res.status(400).json(`This category has ${subCategoryCount} associated sub-categories and cannot be deleted.`);
    }

    await Category.findByIdAndDelete(idCat);
    res.status(200).json("Category deleted successfully");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  searchCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
