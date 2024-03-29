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
    console.log('当前用户:', req.body);
    PetModel.find({username: req.body.username }).then((data) => {
        res.json({
            msg: '获取我的宠物接口成功',
            data: data
        })
    })
})

// 获取正在寄养列表接口
router.get('/getFosterList', function (req, res, next) {
    PetModel.find({fostering: true}).then((data) => {
        res.json({
            msg: '获取寄养列表成功',
            data: data
        })
    })
})

// 获取所有寄养信息
router.get('/getAllFosterList', function (req, res, next) {
    PetModel.find().then((data) => {
        res.json({
            msg: '获取寄养列表成功',
            data: data
        })
    })
})

// 获取寄养预约列表
router.get('/getFostering', function (req, res, next) {
    PetModel.find({isnew: 0}).then((data) => {
        res.json({
            msg: '获取寄养预约申请成功',
            data: data
        })
    })
})

// 同意寄养预约列表
router.post('/confirmFostering',function(req, res, next) {
    PetModel.updateOne({username: req.body.username, petname: req.body.petname}, { $set: {isnew: 1, fostering: true}}).then(() => {
        res.json({
            msg: '同意寄养成功'
        })
    })
})

// 领回宠物
router.post('/takeBackPet',function(req, res, next) {
    PetModel.updateOne({username: req.body.username, petname: req.body.petname}, { $set: {isnew: 2, fostering: false}}).then(() => {
        res.json({
            msg: '领回宠物成功'
        })
    })
})

// 重新寄养宠物
router.post('/refosterPet',function(req, res, next) {
    PetModel.updateOne({username: req.body.username, petname: req.body.petname}, { $set: {isnew: 0}}).then(() => {
        res.json({
            msg: '重新寄养预约已发送成功'
        })
    })
})

// 修改健康状态
router.post('/changeHealthy', function(req, res, next) {
    console.log(req.body);
    PetModel.updateOne({username: req.body.username, petname: req.body.petname}, { $set: {healthy: req.body.healthy}}).then(() => {
        res.json({
            msg: '修健康状态成功'
        })
    })
})


module.exports = router;