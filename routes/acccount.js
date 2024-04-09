const express = require('express');
const router = express.Router();
const path = require('path');

// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

const md5 = require('md5');

const UserModel = require('../models/user');



// 获取所有账号信息
router.get('/getAccounts', function (req, res, next) {
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

// 修改头像
router.post('/changeAvater', function (req, res, next) {
    console.log(req.body)
    UserModel.updateOne({ username: req.body.username }, { $set: { avater: req.body.avater } }).then(() => {
        res.json({
            msg: '修改成功'
        })
    })
})

// 重置账号密码
router.post('/resetPassword', function (req, res, next) {
    const defaultPassword = '123456';
    UserModel.updateOne({ username: req.body.username }, { $set: { password: md5(defaultPassword) } }).then(() => {
        res.json({
            msg: '修改密码成功'
        })
    })
})

// 修改账号密码
router.post('/changePassword', function (req, res, next) {
    const defaultPassword = '123456';
    UserModel.updateOne({ username: req.body.username }, { $set: { password: md5(req.body.password) } }).then(() => {
        res.json({
            msg: '修改密码成功'
        })
    })
})

// text
// router.post('/text', upload.single('file'), function (req, res) {
//     if (req.file) {
//         console.log('文件已上传:', req.file);

//         // 使用上传文件的临时路径
//         const filePath = req.file.path;
//         const formattedPath = filePath.replace(/\\/g, '/');
//         console.log('上传文件的临时路径:', formattedPath);

//         // 获取上传文件的原始文件名和扩展名
//         const originalname = req.file.originalname;
//         const ext = path.extname(originalname);

//         const src = `${req.protocol}://${req.get('host')}/${formattedPath}`;

//         // 构建图片的URL，包含上传文件的后缀名
//         const imageUrl = `${req.protocol}://${req.get('host')}/${formattedPath}${ext}`;
//         console.log('图片URL:', imageUrl);

//         // 在这里处理上传的文件，如保存到服务器或进行其他操作
//         res.json({
//             msg: '文件上传成功',
//             src: src,
//             url: imageUrl
//         });
//     } else {
//         res.status(400).json({ error: '未找到上传的文件' });
//     }
// });


module.exports = router;