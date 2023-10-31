const Subcategory = require('../models/Subcategory');
const Category = require('../models/Category');

// Create a new subcategory
const createSubcategory = async (req, res) => {
	try {
		const { subcategory_name, category_id } = req.body;

		if (!subcategory_name || !category_id) {
			return res.status(400).json({ message: 'Subcategory name and category ID are required' });
		}

		// Check if the subcategory name is unique
		const existingSubcategory = await Subcategory.findOne({ subcategory_name });

		if (existingSubcategory) {
			return res.status(400).json({ message: 'Subcategory name already exists' });
		}

		// Check if the category exists
		const category = await Category.findById(category_id);

		if (!category) {
			return res.status(400).json({ message: 'Category not found' });
		}

		const newSubcategory = new Subcategory({
			subcategory_name,
			category_id,
		});

		const savedSubcategory = await newSubcategory.save();

		res.status(201).json({ message: 'Subcategory created successfully', savedSubcategory });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to create subcategory' });
	}
};

// List all subcategories
const listAllSubcategories = async (req, res) => {
	try {
		const { page } = req.query;
		const limitPerPage = 10;
		const skipVal = (page - 1) * limitPerPage;

		const subcategories = await Subcategory.find()
			.limit(limitPerPage)
			.skip(skipVal);

		res.status(200).json(subcategories);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to list subcategories' });
	}
};

// Search for subcategories
const searchSubcategories = async (req, res) => {
	try {
		const { query, page } = req.query;
		const limitPerPage = 10;
		const skipVal = (page - 1) * limitPerPage;

		const subcategories = await Subcategory.find({ subcategory_name: new RegExp(`^${query}`, 'i') })
			.limit(limitPerPage)
			.skip(skipVal);

		res.status(200).json(subcategories);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to search for subcategories' });
	}
};

// Get a subcategory by ID
const getSubcategory = async (req, res) => {
	const id = req.params.id;
	try {
		const subcategory = await Subcategory.findById(id);

		if (!subcategory) {
			return res.status(404).json({ message: 'No subcategory found with the provided ID' });
		}

		// Fetch the associated category
		const category = await Category.findById(subcategory.category_id);

		res.status(200).json({ status: 200, data: { ...subcategory._doc, category: category.category_name } });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to get subcategory' });
	}
};

// Update a subcategory
const updateSubcategory = async (req, res) => {
	try {
		const id = req.params.id;
		const { subcategoryName, category_id, active } = req.body;

		// Check if the subcategory name is unique
		const existingSubcategory = await Subcategory.findOne({ subcategoryName, _id: { $ne: id } });

		if (existingSubcategory) {
			return res.status(400).json({ message: 'Subcategory name already exists' });
		}

		const updatedSubcategory = await Subcategory.findByIdAndUpdate(
			id,
			{ subcategoryName, category_id, active },
			{ new: true }
		);

		if (!updatedSubcategory) {
			return res.status(404).json({ message: 'No subcategory found with the provided ID' });
		}

		res.status(200).json({ status: 200, message: 'Subcategory updated successfully', data: updatedSubcategory });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to update subcategory' });
	}
};

// Delete a subcategory
const deleteSubcategory = async (req, res) => {
	try {
		const id = req.params.id;

		// Check if the subcategory is attached to any products (you need to define this logic)
		// If it's attached to products, return an error message

		const deletedSubcategory = await Subcategory.findByIdAndDelete(id);

		if (!deletedSubcategory) {
			return res.status(404).json({ message: 'No subcategory found with the provided ID' });
		}

		res.status(200).json({ status: 200, message: 'Subcategory deleted successfully' });
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ message: 'Failed to delete subcategory' });
	}
};

module.exports = {
	createSubcategory,
	listAllSubcategories,
	searchSubcategories,
	getSubcategory,
	updateSubcategory,
	deleteSubcategory,
};
