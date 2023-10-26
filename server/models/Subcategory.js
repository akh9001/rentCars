const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	cars: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Car'
	}]
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
