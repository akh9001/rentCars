// * https://masteringjs.io/tutorials/mongoose/findoneandupdate

const { ObjectId } = require('mongodb');
const Car = require('../models/Car')
const extractOriginalNames = require('../utils/extractOriginalName')
const fs = require('fs');
const perPage = 10

const removeFile = async (filePaths) => {
	const dir = __dirname;
	filePaths.forEach((filePath) => {
	try {
		filePath = dir.substring(0, dir.lastIndexOf("/")) + "/" + process.env.UPLOAD_DIRECTORY + "/" + filePath;
		if (fs.existsSync(filePath)) 
		{
			console.log('File exists and is accessible.');
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error('Error removing file:', err);
					errors.push({ path: filePath, error: err.message });
				}
			});
		}
	} catch (err) {
		console.error('File does not exist or is not accessible.');
	}
	})
};

const addCar = async (req, res) => {
	try{
		//TODO Validator
		if (req.fileValidationError) {
			return next(req.fileValidationError);
		}
		if (!req.files || req.files?.length === 0) {
			return res.status(400).json({ message: 'No files uploaded' });
		}

		const { vin, name, brand, available, price, discount_price, specifications, subcategory } = req.body;
		// console.log(req.body)
		// console.log({ vin, name, brand, available, price, discount_price, specifications, subcategory })
		const newCar = new Car({
			vin,
			name,
			brand,
			available,
			price,
			discount_price,
			specifications: JSON.parse(specifications),
			images: extractOriginalNames(req.files),
			owner: new ObjectId(req.user.id),
			subcategory : new ObjectId(subcategory)
		});
		// console.log(newCar)
		await newCar.save();
		res.status(201).json({ message: "product created successfully"})
	}
	catch(error)
	{
		console.error(error.message)
		removeFile(extractOriginalNames(req.files))
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
			select: 'subcategory_name', // Select the 'name' field of the subcategory
			populate: {
				path: 'category_id', // Nested populate
				model: 'Category', // Replace 'Category' with the actual model name for categories
				select: 'category_name',
			}
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
		const filter = { $and: [] }

		if (req.query.name) {
			filter.$and.push({ name: { $regex: req.query.name, $options: 'i' } })
		}
		if (req.query.vin) {
			filter.$and.push({ vin: { $regex: req.query.vin, $options: 'i' } })
		}
		if (req.query.brand) {
			filter.$and.push({ brand: { $regex: req.query.brand, $options: 'i' } })
		}
		if (req.query.fuel) {
			filter.$and.push({ "specifications.Fuel Type": { $regex: req.query.fuel, $options: 'i' } })
		}
		if (req.query.model) {
			filter.$and.push({ "specifications.Model Year": { $regex: req.query.model, $options: 'i' } })
		}
		if (req.query.gear) {
			filter.$and.push({ "specifications.Gear Type": { $regex: req.query.gear, $options: 'i' } })
		}
		if (req.query.luggage) {
			filter.$and.push({ "specifications.Luggage Capacity": { $regex: req.query.luggage, $options: 'i' } })
		}
		if (req.query.passenger) {
			filter.$and.push({ "specifications.Passenger Capacity": { $lte: parseInt(req.query.passenger) } })
		}

		const cars = await Car.find(filter)
			.sort({ name: sort_direction, brand: sort_direction, price: sort_direction })
			.skip(start_index)
			.limit(limit_per_page)
			.populate({
				path: 'subcategory',
				model: 'Subcategory', // Replace 'Subcategory' with the actual model name for subcategories
				select: 'subcategory_name', // Select the 'name' field of the subcategory
				populate: {
					path: 'category_id', // Nested populate
					model: 'Category', // Replace 'Category' with the actual model name for categories
					select: 'category_name',
				}
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
			select: 'subcategory_name', // Select the 'name' field of the subcategory
			populate: {
				path: 'category_id', // Nested populate
				model: 'Category', // Replace 'Category' with the actual model name for categories
				select: 'category_name',
			}
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
		const id = req.params.id;
		const updatedData = req.body; // Assuming you send updated product data in the request body
		// Check if the car exist
		const existingCar = await Car.findById(id);
		if (!existingCar) {
			return res.status(404).json({ message: 'invalid product id' });
		}
		// Check if the Car vin is unique
		const existingProduct = await Car.findOne({ vin: updatedData.vin });
		if (existingProduct && existingProduct._id.toString() !== id) {
			return res.status(400).json({ message: 'The Vehicle Identification Number (VIN) should be unique' });
		}
		// Update the car data
		const updatedCar = await Car.findByIdAndUpdate(id, updatedData, { new: true });

		res.status(200).json({ message: "Car updated successfully", data: updatedCar});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

const deleteCar = async (req, res) => {
	try{
		const deletedCar = await Car.findOneAndDelete({ _id: new ObjectId(req.params.id) });

		if (deletedCar) {
			console.log('Car deleted successfully' + deletedCar);
			console.log(deletedCar.images)
			removeFile(deletedCar.images)
			res.status(200).json({ message: 'Car deleted successfully' })
		}
		else {
			res.status(404).json({ message: 'Car not found' })
		}
	}
	catch(error)
	{
		res.status(500).json({ message: error.message });
	}
}

const addCarImages = async (req, res) => {
	// 'photos' is the field name for the form data
	// 5 is the maximum number of files allowed in this example
	try {
		const newImages = extractOriginalNames(req.files);
	
		if (req.files.length === 0) {
			return res.status(400).json({ message: 'No files uploaded' });
		}
		const updatedCar = await Car.updateOne(
			{ _id: new ObjectId(req.params.id) },
			{ $push: { images: { $each: newImages } } },
		);
		console.log('Images uploaded successfully' + updatedCar);
		res.status(200).json({ message: 'Images uploaded successfully' });
	}
	catch(error)
	{
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
};

const deleteImageCar = async (req, res) => {
	try{
		console.log("deleteImageCar")
		const id = req.params.id;
		if (!req.params.name || !req.params.id)  {
			return res.status(400).json({ message: "car's id and image's name are required" });
		}
		const updatedCar = await Car.findOneAndUpdate(
			{ _id: id },
			{ $pull: { images: req.params.name } },
			{ new: true }
		);
		if (!updatedCar) {
			res.status(404).json({ message: 'Car not found' })
		} else {
			removeFile([req.params.name])
			res.status(200).json({ message: 'Image deleted successfully', data: updatedCar });
		}
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
}

// const updateCarImages = async (req, res) => {
// 	try {
// 		const carId = req.params.id;
// 		const imageToUpdate = process.env.UPLOAD_DIRECTORY + "/" + req.params.name;
// 		const newImageURL = req.files[0].filename;
// 		if (req.files.length === 0) {
// 			return res.status(400).json({ message: 'No files uploaded' });
// 		}
// 		console.log('New image URL:', newImageURL);
// 		const updatedCar = await Car.findOneAndUpdate(
// 			{ _id: carId, images: imageToUpdate },
// 			{ $set: { 'images.$': newImageURL } },
// 			{ new: true }
// 		);

// 		if (!updatedCar) {
// 			console.error('Car or image not found.');
// 		} else {
// 			console.log('Image deleted successfully : ' + [imageToUpdate]);
// 			removeFile([imageToUpdate])
// 			res.status(200).json({ message: 'Image deleted successfully', data: updatedCar });
// 		}
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).json({ message: error.message });
// 	}
// }

module.exports = { addCar, getAllCars, search, getCarById, updateCar, deleteCar, addCarImages, deleteImageCar}