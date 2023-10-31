const mongoose = require('mongoose');
const Customer = require('./Customer');
const Subcategory = require('./Subcategory');

const carSchema = new mongoose.Schema({
	vin:{
		type: String,
		require: [true, "The Vehicle Identification Number (VIN) is required"],
		unique: true
	},
	name: {
		type: String,
		required: [true, "The name field is required!"],
	},
	brand: { // "Toyota"
		type: String,
		required: [true, "The Brand field is required!"]
	},
	available: {
		type: Boolean,
		default: false
	},
	price : {
		type: Number,
		default: [true, "The price field is required!"],
		min: [0, 'Price should be positive']
	},
	discount_price : {
		type: Number,
		default: false,
		min: [0, 'The discount price should be positive']
	},
	specifications: {
		type: Map,
		of: mongoose.Schema.Types.Mixed,
		required: [true, "The specifications are required!"],
		validate: {
			validator: function (specificationsMap) {
				const requiredKeys = ["Fuel Type", "Model Year", "Vehicle Type", "Gear Type", "Engine Type", "Luggage Capacity", "Passenger Capacity"];
				const keys = Array.from(specificationsMap.keys());
				return requiredKeys.every((key) => keys.includes(key));
			},
			message: "The 'specifications' map must contain keys: 'Fuel Type', 'Model Year', 'Vehicle Type', 'Gear Type', 'Engine Type' , 'passenger Capacity' and 'Luggage Capacity'.",
		},
	},
	images : {
		type: [String],
		required: true
	},
	// quantity:{
	// 	type: Number,
	// 	required: [true, "The quantity field is required!"]
	// },
	owner : // I may need to add the store 
	{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: [true, "The Owner field is required!"]
	},
	subcategory: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Subcategory',
		required: [true, "The subcategory field is required!"]
	},
	rented_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer',
		default: null
	},
	reviews: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Review',
		default: null
	}],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
// TODO : Fields to add.
// * Location Information
// * Availability Schedule
// * Rental History