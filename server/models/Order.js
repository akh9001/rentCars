// const { default: mongoose } = require("mongoose");

// const orderSchema = new mongoose.Schema(
//     {
//     customerId: mongoose.Schema.Types.ObjectId,
//     orderItems: [{
//         productId: mongoose.Schema.Types.ObjectId,
//         productName: String,
//         quantity: Number,
//         unitPrice: Number,
//         total: Number
//     }],
//     orderDate: Date,
//     cartTotalPrice: Number,
//     status: String
// });

// const Order = mongoose.model("Order", orderSchema);

// module.exports = Order;

const { default: mongoose } = require("mongoose");

const rentalSchema = new mongoose.Schema({
	customerId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Customer', // Reference to the Customer model
		required: true
	},
	carId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Car', // Reference to the Car model
		required: true
	},
	first_name:{
		type: String,
		required: true
	},
	last_name:{
		type: String,
		required: true
	},
	address:{
		type: String,
		required: true
	},
	city:{
		type: String,
		required: true
	},
	code_postal:{
		type: Number,
		required: true
	},
	country:
	{
		type: String,
		required: true
	},
	phone_number:
	{
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	totalDays: {
		type: Number,
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'confirmed', 'completed', 'cancelled'],
		default: 'pending'
	}
});

const Order = mongoose.model("Order", rentalSchema);

module.exports = Order;
