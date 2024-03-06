const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avater: {
        type: String,
        default: '0'
    },
    age: {
        type: Number,
        default: 18
    },
    sex: {
        type: Boolean,
        default: 0
    },
    like: {
        type: String,
        default: '小狗'
    },
    location: {
        type: String,
        default: '成都'
    },
    personSlogan: {
        type: String,
        default: '善待宠物,从我做起'
    }
})

// 6.创建模型对象  (对文档操作的封装对象)
let UserModel = mongoose.model('userdatas', UserSchema);

module.exports = UserModel;