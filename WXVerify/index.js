// 生成微信接口验证所需的参数
var getJsapiticket = require('./getJsapiTicket.js');
var sign = require('./sign.js');

function wxVerify(req, res){
	var url = req.query.url || '';
	var accountItem = req.query.accountItem || '';

	getJsapiticket(Date.parse(new Date()), accountItem, function(err, errmsg, data){
		if(err){
			console.log(errmsg);
			res.send({
				code: '-1',
				msg: errmsg
			});
			return;
		}
		console.log(data)
		var signature = sign(data, url);
		console.log(signature)
		res.send({
			code: '0',
			data: {
				nonceStr: signature.nonceStr,
				timestamp: signature.timestamp,
				signature: signature.signature
			}
		});
	});
}
module.exports = wxVerify;

