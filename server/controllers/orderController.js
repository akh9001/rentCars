// const Order = require('../models/Order');



// // Create order

// const createOrder = async  (req, res) => {
//     const order = new Order(req.body);
//     order.save()
//         .then(() => res.status(201).send({ message: "Order saved successfully!" }))
//         .catch(err => res.status(400).send({ error: err.message }));
// };


// //List orders

// const listOrders = async (req, res) => {
//     try {
//         const page = parseInt(req.query.page) || 1;  // Set default page to 1 if not specified
//         const limit = 10;  // This can be any number based on how many records you want per page
//         const skip = (page - 1) * limit;

//         const orders = await Order.aggregate([
//             {
//                 $lookup: {
//                     from: 'customers',
//                     localField: 'customerId',
//                     foreignField: '_id',
//                     as: 'customerDetails'
//                 }
//             },
//             {
//                 $unwind: '$orderItems'
//             },
//             {
//                 $lookup: {
//                     from: 'products',
//                     localField: 'orderItems.productId',
//                     foreignField: '_id',
//                     as: 'orderItems.productDetails'
//                 }
//             },
//             {
//                 $group: {
//                     _id: '$_id',
//                     customerId: { $first: '$customerId' },
//                     customerDetails: { $first: '$customerDetails' },
//                     orderDate: { $first: '$orderDate' },
//                     cartTotalPrice: { $first: '$cartTotalPrice' },
//                     status: { $first: '$status' },
//                     orderItems: { $push: '$orderItems' }
//                 }
//             },
//             {
//                 $skip: skip
//             },
//             {
//                 $limit: limit
//             }
//         ]);

//         res.status(200).send(orders);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// //Get order by ID

// const getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (!order) {
//             return res.status(404).send('Order not found');
//         }
//         res.status(200).send(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

// //Update order status

// const updateOrderStatus = async (req, res) => {
//     try {
//         const order = await Order.findByIdAndUpdate(
//             req.params.id,
//             { status: req.body.status },
//             { new: true }
//         );
//         if (!order) {
//             return res.status(404).send('Order not found');
//         }
//         res.status(200).send(order);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };


// module.exports = {
//     createOrder,
//     listOrders,
//     getOrderById,
//     updateOrderStatus
//   };

const Order = require('../models/Order');
const { ObjectId } = require('mongodb');

// Controller to create a new rental
exports.createRental = async (req, res) => {
	try {
		const rental = new Order({
			customerId: new ObjectId(req.body.customerId),
			carId: new ObjectId(req.body.carId),
			startDate: req.body.startDate,
			endDate: req.body.endDate,
			totalDays: req.body.totalDays,
			totalPrice: req.body.totalPrice,
			status: req.body.status || 'pending'
		});

		const savedRental = await rental.save();
		res.status(201).json(savedRental);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to get all rentals
exports.getAllRentals = async (req, res) => {
	try {
		const rentals = await Order.find();
		res.status(200).json({data: rentals});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to get a specific rental by ID
exports.getRentalById = async (req, res) => {
	try {
		const rental = await Order.findById(req.params.rentalId);
		res.status(200).json({ data: rental });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to update a rental by ID
exports.updateRental = async (req, res) => {
	try {
		const updateData = req.body;
		
		if (req.body.carId) {
			updateData.carId = new ObjectId(updateData.carId);
		}
		if (req.body.customerId) {
			updateData.customerId = new ObjectId(updateData.customerId);
		}
		const updatedRental = await Order.findByIdAndUpdate(
			req.params.rentalId,
			updateData,
			{ new: true }
		);
		res.status(200).json({ message: "Order updated successfully", data: updatedRental });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller to delete a rental by ID
exports.deleteRental = async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.rentalId);
		res.status(200).json({ message: 'Order deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
