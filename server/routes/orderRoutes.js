// const express = require('express');
// const router = express.Router();
// const {
//     createOrder,
//     listOrders,
//     getOrderById,
//     updateOrderStatus
// }  = require('../controllers/orderController');

// // create order
// router.post("/", createOrder);
// //list orders
// router.get("/", listOrders);
// // get order by id
// router.get("/:id", getOrderById);
// //update order
// router.put('/:id', updateOrderStatus);



// module.exports = router;

const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/orderController');

// Create a new order
router.post('/', rentalController.createRental);

// Get all
router.get('/', rentalController.getAllRentals);

// Get a specific rental by ID
router.get('/:rentalId', rentalController.getRentalById);

// Update a rental by ID
router.put('/:rentalId', rentalController.updateRental);

// Delete a rental by ID
router.delete('/:rentalId', rentalController.deleteRental);

module.exports = router;
