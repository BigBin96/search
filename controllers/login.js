const dbquery = require('../connection/mysql-connect.js');

// 登录
module.exports = async (ctx,next) => {
	var data = ctx.request.body;
	var selectsql = `select * from user where username='${data.username}'&&userpwd='${data.password}'`;
	
	await dbquery(selectsql)
	.then((result) => {
		if(result.length != 0){
			//账号密码存在(正确)
			ctx.response.body = 1;
			
			// 对username进行转码cookie储存(防止中文出错)
			var cookie_name = new Buffer(data.username).toString('base64');
			
			// 获取两天之后的时间
			var dateobj = new Date(),
				expiresday = dateobj.getTime() + 1000*60*60*2;	//两小时之后的毫秒数
			
			// 每次登录成功之后发送cookie保持登录状态
			ctx.cookies.set('username',cookie_name,{
				domain: 'localhost',
				path: '/',
				maxAge: 1000*60*60*2,
				expires: dateobj.setTime(expiresday),
				httpOnly: false,
				overwrite: true
			})
			
			ctx.cookies.set('pdd',666,{
				domain: 'localhost',
				path: '/',
				maxAge: 1000*60*60*2,
				expires: dateobj.setTime(expiresday),
				httpOnly: false,
				overwrite: true
			})
		}else{
			//账号密码不匹配或不存在
			ctx.response.body = 2;
		}
	})
	.catch((err) => {	//查询发生错误
		console.log(err)
		ctx.response.body = 0;
	})
}