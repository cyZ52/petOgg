var express = require('express');
var router = express.Router();

const PetModel = require('../models/foster');

// 发送寄养申请接口
router.post('/applyFoster', function (req ,res, next) {
    console.log(req.body);
    PetModel.create({...req.body}).then(() => {
        res.json({
            msg: '发送申请成功'
        })
    })
});

// 获取我的宠物接口
router.post('/getMypet', function (req, res, next) {
    console.log(req.body);
    PetModel.find({username: req.body.username }).then((data) => {
        res.json({
            msg: '获取我的宠物接口成功',
            data: data
        })
    })
})

router.get('/getFosterList', function (req, res, next) {
    PetModel.find().then((data) => {
        res.json({
            msg: '获取寄养列表成功',
            data: data
        })
    })
})


module.exports = router;