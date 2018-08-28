var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const config = require('config')

var app = express();

var session = require('express-session');

app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', config.header_request);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8;text/html");
    //设置Access-Control-Allow-Credentials为true
    res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});

app.use(cookieParser());
app.use(session({
    name: 'mycookie',
    cookie: ('name', 'value', { path: '/', httpOnly: true,secure: false, maxAge:  6000000 }),
    secret: 'unblockmy',
    resave: false,
    saveUninitialized:true
}));

// var identityKey = 'skey';
// app.use(session({
//     name: identityKey,
//     secret: 'chyingp',  // 用来对session id相关的cookie进行签名
//     store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
//     saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
//     resave: false,  // 是否每次都重新保存会话，建议false
//     cookie: {
//         maxAge: 10 * 1000  // 有效期，单位是毫秒
//     }
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
