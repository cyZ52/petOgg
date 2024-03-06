var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require("express-session");
const MongoStore = require('connect-mongo');

const cors = require('cors');

var authRouter = require('./routes/auth');

var app = express();

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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/auth', authRouter);

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
