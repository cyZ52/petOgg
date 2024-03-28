const mongoose = require('mongoose');

let PetSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    avater: {
        type: String,
        required: true
    },
    petname: {
        type: String,
        required: true
    },
    petphoto: {
        type: String,
        default: '1'
    },
    pettype: {
        type: String,
    },
    healthy: {
        type: String,
        default: '良好'
    },
    fostering: {
        type: Boolean,
        default: false
    },
    isnew: {
        type: Number,
        default: 0
    },
})

// 6.创建模型对象  (对文档操作的封装对象)
let PetModel = mongoose.model('foster', PetSchema);

module.exports = PetModel;