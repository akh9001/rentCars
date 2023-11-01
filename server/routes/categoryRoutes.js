const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { authentication, checkUserRole } = require('../middleware/authMiddleware');

// POST http://localhost:0000/v1/categories
router.post('/', authentication, checkUserRole(["admin", "manager"]), CategoryController.addCategory);

// GET http://localhost:0000/v1/categories?page=1
router.get('/', CategoryController.getAllCategories);

// GET http://localhost:0000/v1/categories?category_name=test&page=1&limit=1
router.get('/search', CategoryController.searchCategory);

// GET http://localhost:0000/v1/categories/{id}
router.get('/:id', CategoryController.getCategory);

// PUT http://localhost:0000/v1/categories/{id}
router.put('/:id', authentication, checkUserRole(['admin', 'manager']), CategoryController.updateCategory);

// DELETE http://localhost:0000/v1/categories/{id}
router.delete('/:id', authentication, checkUserRole(['admin', 'manager']), CategoryController.deleteCategory);

module.exports = router;
