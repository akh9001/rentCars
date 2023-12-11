const express = require('express');
const { addCar, getAllCars, search, getCarById, updateCar, deleteCar, addCarImages, deleteImageCar} = require('../controllers/carController');
const router = express.Router();
const { authentication, checkUserRole} = require('../middleware/authMiddleware');
const upload = require('../utils/upload')
const max_photos = process.env.NBR_MAX_PHOTOS; 

// * Create a new product (car)
router.post('/', authentication, checkUserRole(["admin", "manager"]), upload.array('images', max_photos), addCar);

// * List all the products
//GET : 127.0.0.1:PORT/cars
router.get('/', getAllCars);

// * Search for car 
//GET : 127.0.0.1:PORT/cars/search?name=toyota
//GET : http://localhost:3000/cars/search?vin=DEF789UVW123&page=1
router.get('/search/', search);

// * Implement get user by ID 
router.get('/:id', getCarById);

// * Implement update a Car by ID 
router.put('/:id', authentication, checkUserRole(["admin", "manager"]), updateCar);

// * Implement upload more images to a car
// PUT: http://localhost:3000/cars/images/<carId>
router.put('/images/:id', authentication, checkUserRole(["admin", "manager"]), upload.array('images', 5), addCarImages);

// * Implement delete image from a car
//DELETE: localhost:3000/cars/<id_car>/images/<name_image>
router.delete('/:id/images/:name', authentication, checkUserRole(["admin", "manager"]), deleteImageCar)	

// * Implement delete car
router.delete('/:id', deleteCar)

module.exports = router;