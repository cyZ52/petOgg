var express = require('express');
var router = express.Router();

const UserModel = require('../models/user');

const md5 = require('md5');

router.post('/login', function (req, res, next) {
  const { username, password } = req.body;

  UserModel.find({ username: username, password: md5(password) }).then((data) => {
    console.log('当前用户信息', data)
    if (data.length > 0) {
      req.session.username = data[0].username;
      req.session._id = data[0]._id;

      console.log('session信息:',req.session.username)
      if (username == 'amdin') {
        res.json({
          code: '0000',
          msg: '欢迎管理员登录!',
          data: null
        })
      } else {
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

// *
router.get('/checkLogin', function (req, res, next) {
  console.log(req.session.username);
  if(!req.session.username) {
    res.json({
      msg: 'offLogin'
    })
  } else {
    res.json({
      msg: 'isLogin'
    })
  }
})

// *
router.get('/logout', function (req, res, next) {
  req.session.destroy(() => {
    res.json({
      msg: '退出登录'
    })
  })
  console.log('1')
})

module.exports = router;
