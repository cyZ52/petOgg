const mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
    name: String,
    photo: String,
    price: Number,
    detail: String,
    username: String,
    state: {
        type: Number,
        default: 0
    }
})

let OrderModel = mongoose.model('orders', OrderSchema);

module.exports = OrderModel;