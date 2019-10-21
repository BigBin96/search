const model = require('../getmodel.js')().main;

// 请求首页处理
module.exports = async (ctx,next) => {
	var user_status = ctx.cookies.get('username');

	if(!user_status){	//用户第一次访问或者登录状态已经过期
		ctx.render('login.html',model.login);
	} else {	//用户登录状态未过期，直接进入首页
		// 解码cookie(处理中文的情况)
		var cookie_name = new Buffer(user_status,'base64').toString();
		
		ctx.render('index.html',{
			username:cookie_name,
			title:'首页'
		});
	}
}