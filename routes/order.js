var express = require('express');
var router = express.Router();

const OrderModel = require('../models/order');
const ProductModel = require('../models/product');

// 购买商品
router.post('/buyProduct', function (req, res, next) {
    ProductModel.findOne({ name: req.body.name, detail: req.body.detail }).then((product) => {
        const popular = product.popular + 1;
        ProductModel.updateOne({ name: req.body.name, detail: req.body.detail }, { $set: { popular: popular } }).then(() => {
            OrderModel.create({ username: req.body.username, ...req.body }).then(() => {
                res.json({
                    msg: '创建订单成功'
                })
            })
        })
    })
})

// 获取指定用户订单
router.post('/getMyOrder', function(req, res, next) {
    OrderModel.find({username: req.body.username}).then(data => {
        res.json({
            msg: '获取我的订单成功',
            data: data
        })
    })
})

// 获取所有订单
router.get('/getAllOrder', function(req ,res, next) {
    OrderModel.find().then(data => {
        res.json({
            msg: '获取订单成功',
            data: data
        })
    })
})

// 商家确认发货
router.post('/sendProduct', function(req, res, next) {
    OrderModel.updateOne({_id: req.body.id}, {$set: {state: 1}}).then(() => {
        res.json({
            msg: '发货成功'
        })
    })
})

// 买家确认收货
router.post('/takeProduct', function(req, res, next) {
    OrderModel.updateOne({_id: req.body.id}, {$set: {state: 2}}).then(() => {
        res.json({
            msg: '收货成功'
        })
    })
})

// 买家申请退货
router.post('/returnProduct', function(req, res, next) {
    OrderModel.updateOne({_id: req.body.id}, {$set: {state: 3}}).then(() => {
        res.json({
            msg: '退货申请成功'
        })
    })
})

// 卖家家同意退货
router.post('/confirmReturnProduct', function(req, res, next) {
    OrderModel.updateOne({_id: req.body.id}, {$set: {state: 4}}).then(() => {
        res.json({
            msg: '退货成功'
        })
    })
})

module.exports = router;