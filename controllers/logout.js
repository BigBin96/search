// 退出登录处理事件
module.exports = async (ctx,next) => {
	var user_status = ctx.cookies.get('username');
	
	ctx.cookies.set('username','',{
		domain:'localhost',
		path: '/',
		maxAge: 0,
		expires: new Date(),
		secure: false,
		httpOnly: false,
		overwrite: true
	})
	
	ctx.cookies.set('pdd','',{
		domain:'localhost',
		path: '/',
		maxAge: 0,
		expires: new Date(),
		secure: false,
		httpOnly: false,
		overwrite: true
	})
	
	ctx.response.body = 1;	//	退出成功,响应1
}