// * https://masteringjs.io/tutorials/mongoose/findoneandupdate

const { ObjectId } = require('mongodb');
const Car = require('../models/Car')
const perPage = 10

const addCar = async (req, res) => {
	try{
			//TODO Validator
		const { vin, name, brand, available, price, discount_price, features, image, subcategory } = req.body;
		const newCar = new Car({
			vin,
			name,
			brand,
			available,
			price,
			discount_price,
			features,
			image,
			subcategory
		});
		await newCar.save();
		res.status(201).json({ message: "product created successfully"})
	}
	catch(error)
	{
		console.log(error.message)
		res.status(500).json({message: error.message});
	}
}

const getAllCars = async (req, res) => {
	try{
		const page = parseInt(req.query.page) || 1;
		const cars =  await Car.find()
		.skip((page - 1) * perPage)
		.limit(perPage)
		.populate({
			path: 'subcategory',
			model: 'Subcategory', // Replace 'Subcategory' with the actual model name for subcategories
			select: 'name', // Select the 'name' field of the subcategory
		})
		res.status(200).json({ data: cars });
	}
	catch(error)
	{
		console.log(error.message)
		res.status(500).json({ message: error.message });
	}
}

const search = async (req, res) => {
	try {
		const page = parseInt(req.query.page);
		const limit_per_page = parseInt(process.env.LIMIT_PER_PAGE);
		const start_index = (page - 1) * limit_per_page;
		const sort_direction = req.query.sort === 'DESC' ? -1 : 1;

		const filter = {
			$or: [
				{ name: { $regex: req.query.name, $options: 'i' } },
				{ vin: { $regex: req.query.vin, $options: 'i' } },
				{ brand: { $regex: req.query.brand, $options: 'i' } },
				{ fuel_type: { $regex: req.query.fuel, $options: 'i' } },
				{ model_year: { $regex: req.query.model, $options: 'i' } },
				{ gear_type: { $regex: req.query.gear, $options: 'i' } },
				{ luggage_capacity: { $regex: req.query.luggage, $options: 'i' } },
				{ passenger_capacity: { $regex: req.query.passenger, $options: 'i' } },
			],
		};

		const cars = await Car.find(filter)
			.sort({ name: sort_direction, brand: sort_direction, price: sort_direction })
			.skip(start_index)
			.limit(limit_per_page)
			.populate({
				path: 'subcategory',
				model: 'Subcategory', // Replace 'Subcategory' with the actual model name for subcategories
				select: 'name', // Select the 'name' field of the subcategory
			});

		res.status(200).json({ data: cars });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
};


const getCarById = async (req, res) => {
	const carId = req.params.id;
	try {
		const car = await Car.findById(carId)
		.populate({
			path: 'subcategory',
			model: 'Subcategory', // Replace 'Subcategory' with the actual model name for subcategories
			select: 'name', // Select the 'name' field of the subcategory
		});

		if (car) {
			res.status(200).json({ data: car });
		} else {
			res.status(404).json({ message: 'Car not found with the provided ID' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Error while fetching the car' });
	}
};

const updateCar = async (req, res) => {
	try {
		const productId = req.params.id;
		const updatedData = req.body; // Assuming you send updated product data in the request body

		// Check if the product name is unique
		const existingProduct = await Product.findOne({ name: updatedData.name });
		if (existingProduct && existingProduct._id.toString() !== productId) {
			return res.status(400).json({ message: 'Product name must be unique' });
		}

		// Update the product data
		const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, { new: true });

		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
}

module.exports = { addCar, getAllCars, search, getCarById, updateCar, deleteCar }