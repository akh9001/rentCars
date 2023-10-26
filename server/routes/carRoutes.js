const express = require('express');
const { addCar, getAllCars, search, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const router = express.Router();
const { authentication, checkUserRole} = require('../middleware/authMiddleware');


// * Create a new product (car)
router.post('/', authentication, checkUserRole(["admin", "manager"]), addCar);

// * List all the products
router.get('/', getAllCars);

// * Search for car 
router.get('/search/', search);

// * Implement get user by ID 
router.get('/:id', getCarById);

// * Implement update a Car by ID 
router.put('/:id', authentication, checkUserRole(["admin", "manager"]), updateCar);

// * Implement delete car
router.delete('/:id', deleteCar)

module.exports = router;