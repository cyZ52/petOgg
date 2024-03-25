var express = require('express');
var router = express.Router();

const md5 = require('md5');

const UserModel = require('../models/user');



// 获取所有账号信息
router.get('/getAccounts', function (req ,res, next) {
    UserModel.find({}).then((data) => {
        res.json({
            data: data
        })
    })
})

// 修改用户信息接口
router.post('/changeUserInfo', function (req, res, next) {
    console.log('需要修改的信息：', req.body);
    UserModel.updateOne({ username: req.body.username }, { $set: { ...req.body } }).then(() => {
      res.json({
        msg: '修改成功'
      })
    })
  })

// 重置账号密码
router.post('/resetPassword', function(req, res, next) {
    const defaultPassword = '123456';
    UserModel.updateOne({ username: req.body.username}, { $set: {password: md5(defaultPassword)}}).then(() => {
        res.json({
            msg: '修改密码成功'
        })
    })
  })

// 修改账号密码
router.post('/changePassword', function(req, res, next) {
    const defaultPassword = '123456';
    UserModel.updateOne({ username: req.body.username}, { $set: {password: md5(req.body.password)}}).then(() => {
        res.json({
            msg: '修改密码成功'
        })
    })
})

module.exports = router;