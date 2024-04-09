var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/') // 设置文件上传目录
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // 设置文件名
  }
});

const upload = multer({ storage: storage });

const session = require("express-session");
const MongoStore = require('connect-mongo');

const cors = require('cors');

var authRouter = require('./routes/auth');
var notifyRouter = require('./routes/notify');
var accountRouter = require('./routes/acccount');
var fosterRouter = require('./routes/foster');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var discussRouter = require('./routes/discuss');


var app = express();

app.use('/uploads', express.static('uploads'));

const {DBHOST, DBPORT, DBNAME} = require('./config/config');

// session设置
app.use(session({
  name: 'sid',                // 设置cookie的name，默认值为 connect.sid        
  secret: 'cyz',              // 参与加密的字符串(签名)
  saveUninitialized: false,   // 是否为每次请求都设置一个cookie来存储session_id
  resave: true,               // 是否每次请求时重新保存session
  store: MongoStore.create({
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: {
    httpOnly: true,            // 前端是否能通过JS操作session
    maxAge: 1000 * 3600 * 24   // session过期时间
  }
}))

// 允许跨域访问，设置允许的域名
app.use(cors({
  origin: 'http://localhost:3000', // 前端服务器地址
  credentials: true, // 允许携带跨域 Cookie
}));

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1');
//   res.header("Access-Control-Allow-Credentials",true);
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
//   });



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 接口路由
app.use('/auth', authRouter);
app.use('/notify', notifyRouter);
app.use('/account', accountRouter);
app.use('/foster', fosterRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/discuss',discussRouter);

app.post('/uploadImg', upload.single('file'), function (req, res) {
  if (req.file) {
      console.log('文件已上传:', req.file);

      // 使用上传文件的临时路径
      const filePath = req.file.path;
      const formattedPath = filePath.replace(/\\/g, '/');
      console.log('上传文件的临时路径:', formattedPath);

      // 获取上传文件的原始文件名和扩展名
      const originalname = req.file.originalname;
      const ext = path.extname(originalname);

      // 构建图片的URL，包含上传文件的后缀名
      const imageUrl = `${req.protocol}://${req.get('host')}/${formattedPath}`;
      console.log('图片URL:', imageUrl);

      // 在这里处理上传的文件，如保存到服务器或进行其他操作
      res.json({
          msg: '文件上传成功',
          url: imageUrl
      });
  } else {
      res.status(400).json({ error: '未找到上传的文件' });
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;