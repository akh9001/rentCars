const mongoose = require('mongoose');
const User = require('./User');

const storeSchema = new mongoose.Schema({
	name: { type: String, required: true },
	address: { type: String, required: true },
	contactInfo: {
		phone: String,
		email: String,
	},
	manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
	cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
