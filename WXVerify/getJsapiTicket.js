// 获取jsapi_ticket
var request = require('request');
var appid = '********';
var appsecret = '********';

// 缓存access_token
var access_token = '';
// 缓存jsapi_ticket
var jsapi_ticket = '';
// 上一次获取token的时间
var lastTokenDate = Date.parse(new Date())/1000;
// 上一次获取jsapi_ticket的时间
var lastTicketDate = Date.parse(new Date())/1000;

// 获取access_token
// @params nowDate: 当前时间戳
// @params callback(err, errmsg, data);
function getAccesstoken(nowDate, callback){
	var timePassed = (nowDate - lastTokenDate)/7200;
	if(access_token == '' || timePassed >= 2){
		// 重新获取access_token
		lastTokenDate = Date.parse(new Date())/1000;
		var url = 'https://api.weixin.qq.com/cgi-bin/token?' +
				  'grant_type=client_credential&appid=' + appid +
				  '&secret=' + appsecret;
		request.get(url, function(err, data){
			if(err){
				console.error(err);
				callback(err, '请求access_token失败', null);
				return;
			}
			data = JSON.parse(data.body);
			if(data['access_token']){
				access_token = data['access_token'];
				callback(null, '', access_token);
			}else{
				callback('err', data.errmsg, null);
			}
		});
	}else{
		// 返回之前的access_token
		callback(null, '', access_token);
	}
}

// 获取jsapi_ticket
// @params nowDate 当前时间戳
// @params accountItem 公众号名称
// @params callback(err, errmsg, data);
function getJsapiticket(nowDate, accountItem, callback){
	if(!accountItem){
		callback('err', '缺少公众号名称', null);
		return;
	}
	// 确定公众号的appid appsecret
	switch(accountItem){
		case 'workon':
		appid = '********';
		appsecret = '********';
		break;
		case 'maotouin':
		appid = '********';
		appsecret = '********';
		break;
		case 'yaoleme':
		appid = '********';
		appsecret = '********';
		break;
		case 'ccnc':
		appid = '********';
		appsecret = '********';
		break;
	}
	
	nowDate = nowDate/1000;
	var timePassed = (nowDate - lastTicketDate)/7200;
	if(jsapi_ticket == '' || timePassed >= 2){
		// 重新获取jsapi_ticket
		lastTicketDate = Date.parse(new Date())/1000;
		getAccesstoken(nowDate, function(err, errmsg, data){
			if(err){
				callback(err, errmsg, null);
				return;
			}
			var url = 'https://api.weixin.qq.com/cgi-bin/ticket/' +
					  'getticket?access_token=' + data +
					  '&type=jsapi';
			request.get(url, function(err, data){
				if(err){
					console.error(err);
					callback(err, '请求jsapi_ticket失败', null);
					return;
				}
				data = JSON.parse(data.body);
				if(data['ticket']){
					jsapi_ticket = data['ticket'];
					callback(null, '', jsapi_ticket);
				}else{
					callback('err', data.errmsg, null);
				}
			});
		});	
	}else{
		// 返回之前的access_token
		callback(null, '', jsapi_ticket);
	}
}

module.exports = getJsapiticket;

