const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController');
const { checkUserRole } = require('../middleware/authMiddleware');

// POST http://localhost:0000/v1/categories
router.post('/', checkUserRole(['admin', 'manager']), CategoryController.addCategory);

// GET http://localhost:0000/v1/categories?page=1
router.get('/', CategoryController.getAllCategories);

// GET http://localhost:0000/v1/categories?query=women&page=1
router.get('/search', CategoryController.searchCategory);

// GET http://localhost:0000/v1/categories/{id}
router.get('/:id', CategoryController.getCategory);

// PUT http://localhost:0000/v1/categories/{id}
router.put('/:id', checkUserRole(['admin', 'manager']), CategoryController.updateCategory);

// DELETE http://localhost:0000/v1/categories/{id}
router.delete('/:id', checkUserRole(['admin', 'manager']), CategoryController.deleteCategory);

module.exports = router;
