var express = require('express');
var router = express.Router();

const ProductModel = require('../models/product');

// 新建产品
router.post('/setProduct', function (req, res, next) {
    ProductModel.create({ ...req.body }).then(() => {
        res.json({
            msg: '新建商品成功!'
        })
    })
})

// 获取所有产品
router.get('/getAllProduct', function (req, res, next) {
    ProductModel.find().then((data) => {
        res.json({
            msg: '获取所有产品成功!',
            data: data
        })
    })
})

// 获取在售产品
router.get('/getProduct', function (req, res, next) {
    ProductModel.find({ onsale: true }).then((data) => {
        res.json({
            msg: '获取在售产品成功!',
            data: data
        })
    })
})

// 改变上架状态
router.post('/changeOnSale', function (req, res, next) {
    ProductModel.findOne({ name: req.body.name }).then(product => {
        const onsale = !product.onsale;
        ProductModel.updateOne({ name: req.body.name }, { $set: { onsale: onsale  } }).then(() => {
            res.json({
                msg: '修改上架状态成功'
            })
        })
    })
})


module.exports = router;