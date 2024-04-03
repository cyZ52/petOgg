const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    photo: {
        type: String
    },
    price: {
        type: Number
    },
    detail: {
        type: String
    },
    onsale: {
        type: Boolean
    },
    popular: {
        type: Number,
        default: 0
    },
})

let ProductModel = mongoose.model('products', ProductSchema);

module.exports = ProductModel;