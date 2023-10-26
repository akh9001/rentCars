const express = require('express');
const router = express.Router();
const {
    createOrder,
    listOrders,
    getOrderById,
    updateOrderStatus
}  = require('../controllers/orderController');

// create order
router.post("/orders", createOrder);
//list orders
router.get("/orders", listOrders);
// get order by id
router.get("/orders:id", getOrderById);
//update order
router.put('/:id', updateOrderStatus);



module.exports = router;
