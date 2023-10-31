const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
    customerId: mongoose.Schema.Types.ObjectId,
    orderItems: [{
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        unitPrice: Number,
        total: Number
    }],
    orderDate: Date,
    cartTotalPrice: Number,
    status: String
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
