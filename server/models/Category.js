const mongoose = require('mongoose');
const Product = require('./Product');

const carCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	cars: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Car'
	}]
});

const Category = mongoose.model('Category', carCategorySchema);

module.exports = Category;
