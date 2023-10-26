const Order = require('../models/Order');



// Create order

const createOrder = async  (req, res) => {
    const order = new Order(req.body);
    order.save()
        .then(() => res.status(201).send({ message: "Order saved successfully!" }))
        .catch(err => res.status(400).send({ error: err.message }));
};


//List orders

const listOrders = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Set default page to 1 if not specified
        const limit = 10;  // This can be any number based on how many records you want per page
        const skip = (page - 1) * limit;

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'customers',
                    localField: 'customerId',
                    foreignField: '_id',
                    as: 'customerDetails'
                }
            },
            {
                $unwind: '$orderItems'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'orderItems.productId',
                    foreignField: '_id',
                    as: 'orderItems.productDetails'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    customerId: { $first: '$customerId' },
                    customerDetails: { $first: '$customerDetails' },
                    orderDate: { $first: '$orderDate' },
                    cartTotalPrice: { $first: '$cartTotalPrice' },
                    status: { $first: '$status' },
                    orderItems: { $push: '$orderItems' }
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]);

        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Get order by ID

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};

//Update order status

const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!order) {
            return res.status(404).send('Order not found');
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    createOrder,
    listOrders,
    getOrderById,
    updateOrderStatus
  };