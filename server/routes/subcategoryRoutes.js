const express = require('express');
const router = express.Router();
const SubcategoryController = require('../controllers/subcategoryController');
const { checkUserRole } = require('../middleware/authMiddleware');

// POST http://localhost:PORT/subcategories/subcategories
router.post('/', SubcategoryController.createSubcategory);

// GET http://localhost:PORT/subcategories/subcategories/search?subcategory_name=test&page=1&limit=10
router.get('/search', SubcategoryController.searchSubcategories);

// GET http://localhost:PORT/subcategories/subcategories?page=1
router.get('/', SubcategoryController.listAllSubcategories);

// GET http://localhost:PORT/subcategories/subcategories/{id}
router.get('/:id', SubcategoryController.getSubcategory);

// PUT http://localhost:PORT/subcategories/subcategories/{id}
router.put('/:id', checkUserRole(['admin', 'manager']), SubcategoryController.updateSubcategory);

// DELETE http://localhost:PORT/subcategories/subcategories/{id}
router.delete('/:id', checkUserRole(['admin', 'manager']), SubcategoryController.deleteSubcategory);

module.exports = router;
