const express = require('express');
const { addCar, getAllCars, search, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const router = express.Router();
const { authentication, checkUserRole} = require('../middleware/authMiddleware');
const upload = require('../utils/upload')
const max_photos = process.env.NBR_MAX_PHOTOS; 

// * Create a new product (car)
router.post('/', authentication, checkUserRole(["admin", "manager"]), upload.array('images', max_photos), addCar);

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

router.post('/upload', upload.array('images', 5), (req, res) => {
	// 'photos' is the field name for the form data
	// 5 is the maximum number of files allowed in this example

	if (req.files.length === 0) {
		return res.status(400).json({ message: 'No files uploaded' });
	}

	// At this point, req.files contains an array of uploaded files
	console.log(req.files);
	// You can process the uploaded files, store them, or perform other actions

	res.status(200).json({ message: 'Files uploaded successfully' });
});

module.exports = router;