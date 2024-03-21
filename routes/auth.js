var express = require('express');
var router = express.Router();

const UserModel = require('../models/user');

const md5 = require('md5');

// 登录接口
router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  UserModel.find({ username: username, password: md5(password) }).then((data) => {
    console.log('当前用户信息', data)
    if (data.length > 0) {
      req.session.username = data[0].username;
      req.session._id = data[0]._id;

      // console.log('session信息:',req.session)
      console.log('login:', req.session.username)
      if (username == 'amdin') {
        res.json({
          code: '0000',
          msg: '欢迎管理员登录!',
          data: req.body
        })
      } else {
        console.log('111111111111', req.body)
        res.json({
          code: '0001',
          msg: `欢迎用户${username}!`,
          data: req.body
        })
      }
    } else {
      res.json({
        code: '0002',
        msg: '用户名或密码错误',
        data: null
      })
    }
  })
})

// 注册接口
router.post('/register', function (req, res, next) {
  const { username, password } = req.body;

  UserModel.find({ username: username }).then((data) => {
    if (data.length > 0) {
      res.json({
        code: '0003',
        msg: '用户名已存在',
        data: null
      })
    } else {
      UserModel.create({ username, password: md5(password) }).then(() => {
        res.json({
          code: '0004',
          msg: '注册成功',
          data: null
        })
      })
    }
  }).catch(() => {
    res.json({
      code: '0005',
      msg: '注册失败',
      data: null
    })
  })
})

// 登录验证接口   *
router.get('/checkLogin', function (req, res, next) {
  console.log('checkLogin:', req.session.username);
  if (!req.session) {
    res.json({
      msg: 'offLogin'
    })
  } else {
    res.json({
      msg: 'isLogin'
    })
  }
})

// 退出登录接口    *
router.get('/logout', function (req, res, next) {
  req.session.destroy(() => {
    res.json({
      msg: '退出登录'
    })
  })
  console.log('1')
})

// 获取当前用户信息接口
router.post('/getUserInfo', function (req, res, next) {
  UserModel.findOne({ username: req.body.username }).then(data => {
    res.json({
      msg: '获取用户信息成功',
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

module.exports = router;