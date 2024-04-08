var express = require('express');
var router = express.Router();

const DiscussModel = require('../models/discuss');

// 用户提问
router.post('/askDiscuss', function(req, res, next) {
    DiscussModel.create({username: req.body.username, user: req.body.user}).then(() => {
        res.json({
            msg: '提问成功'
        })
    })
})

// 管理员回答
router.post('/answerDiscuss', function(req, res, next) {
    DiscussModel.updateOne({username: req.body.username, user: req.body.user}, {$set: {admin: req.body.admin}}).then(() => {
        res.json({
            msg: '回答成功'
        })
    })
})

// 获取Discuss
router.get('/getDiscuss', function(req, res, next) {
    DiscussModel.find().then((data) => {
        res.json({
            msg: '获取留言板信息成功',
            data: data
        })
    })
})

module.exports = router;