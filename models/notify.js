const mongoose = require('mongoose');

let NotifySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

// 6.创建模型对象  (对文档操作的封装对象)
let NotifyModel = mongoose.model('notifies', NotifySchema);

module.exports = NotifyModel;