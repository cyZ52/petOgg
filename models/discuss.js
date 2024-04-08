const mongoose = require('mongoose');

let DiscussSchema = new mongoose.Schema({
    username: String,
    user: String,
    admin: {
        type: String,
        default: '当前问题暂时没有回答,请等待管理员处理。'
    }
})

let DiscussModel = mongoose.model('discuss', DiscussSchema);

module.exports = DiscussModel;