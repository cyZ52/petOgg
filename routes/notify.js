var express = require('express');
var router = express.Router();

const NotifyModel = require('../models/notify');

// 获取系统通知
router.get('/getNotifies', function (req ,res, next) {
    NotifyModel.find({}).then((data) => {
        res.json({
            data: data
        })
    })

})

// 新增系统通知
router.post('/setNotifies', function (req ,res, next) {
    console.log('新增的系统通知:', req.body);
    NotifyModel.create({ title: req.body.title, description: req.body.description}).then(() => {
        res.json({
            msg: '发布成功'
        })
    })
})

// 删除系统通知
router.post('/deleteNotify', function (req, res, next) {
    console.log('删除系统通知:', req.body);
    NotifyModel.deleteMany({ title: req.body.title}).then(() => {
        res.json({
            msg: '删除成功'
        })
    })
})




module.exports = router;