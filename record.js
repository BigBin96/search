// 记录加载时间和地址
module.exports = async (ctx,next) => {
	var date = new Date();
	var url = ctx.request.url;
	await next();
	var loadTime = new Date() - date;
	ctx.response.set('X-Response-Time', `${loadTime}ms`);
}