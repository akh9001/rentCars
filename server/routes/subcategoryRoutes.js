const express = require('express');
const router = express.Router();
const SubcategoryController = require('../controllers/subcategoryController');
const { checkUserRole } = require('../middleware/authMiddleware');

// POST http://localhost:0000/v1/subcategories
router.post('/', SubcategoryController.createSubcategory);

// GET http://localhost:0000/v1/subcategories?page=1
router.get('/', SubcategoryController.listAllSubcategories);

// GET http://localhost:0000/v1/subcategories?query=pants&page=1
router.get('/', SubcategoryController.searchSubcategories);

// GET http://localhost:0000/v1/subcategories/{id}
router.get('/:id', SubcategoryController.getSubcategory);

// PUT http://localhost:0000/v1/subcategories/{id}
router.put('/:id', checkUserRole(['admin', 'manager']), SubcategoryController.updateSubcategory);

// DELETE http://localhost:0000/v1/subcategories/{id}
router.delete('/:id', checkUserRole(['admin', 'manager']), SubcategoryController.deleteSubcategory);

module.exports = router;
