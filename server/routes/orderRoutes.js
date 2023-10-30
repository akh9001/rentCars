const express = require('express');
const router = express.Router();
const {
    createOrder,
    listOrders,
    getOrderById,
    updateOrderStatus
}  = require('../controllers/orderController');

// create order
router.post("/", createOrder);
//list orders
router.get("/", listOrders);
// get order by id
router.get("/:id", getOrderById);
//update order
router.put('/:id', updateOrderStatus);



module.exports = router;
