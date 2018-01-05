var express = require('express');
var app = express();
var http = require('http').Server(app);
// 微信接口验证
var wxVerify = require('./WXVerify/index.js');

// 解决跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// 提供静态文件服务
app.use(express.static('webApp'));

// 测试路由
app.get('/', function(req, res){
	res.send('Hello world 1!');
});
app.get('/hello', function(req, res){
	res.send('Hello!');
});
// 微信接口验证
app.get('/wxVerify', function(req, res){
	wxVerify(req, res);
});

http.listen(3000, function(){
	console.log('Server is running at port 3000.')
});
