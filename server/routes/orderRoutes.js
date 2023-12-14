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
const { authentication } = require('../middleware/authMiddleware');

// Create a new order
router.post('/', authentication, rentalController.createRental);

// Get all
router.get('/', authentication, rentalController.getAllRentals);

// Get a specific rental by ID
router.get('/:rentalId', authentication, rentalController.getRentalById);

// Update a rental by ID
router.put('/:rentalId', authentication, rentalController.updateRental);

// Delete a rental by ID
router.delete('/:rentalId', authentication, rentalController.deleteRental);

module.exports = router;
