var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// 命令行打印日志
var logger = require('morgan');
//解析req.cookie
var cookieParser = require('cookie-parser');
//解析req.body
var bodyParser = require('body-parser');

var apiRouter = require('./api');
// global.nodeServer = require('./dataServer/node_ocr_baidu');


var app = express();

// app.set('views', "localhost:3334");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
//解析 json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// console.log(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));


// app.use('/index',(req,res)=>{
//   res.send("success");
// })

// 跨域设置
app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

//装载路由
app.use('/api', apiRouter)


// app.use('/users', users);
// app.use('/search',routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
