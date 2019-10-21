var dbquery = require('../connection/mysql-connect.js');

module.exports = async (ctx,next) => {
	var data = ctx.request.body;
	var user_status = ctx.cookies.get('username');
	
	var selectsql = `select * from search where type like '%${data.search_word}%' or brand like '%${data.search_word}%' or txt like '%${data.search_word}%'`;
	
	await dbquery(selectsql)
		.then((result) => {
			if(result.length > 0){	//	查到了就返回数据
				// 解码cookie(处理中文的情况)
				var cookie_name = new Buffer(user_status,'base64').toString();
				
				// 数据格式化
				var newString = JSON.stringify(result),
					jsondata = JSON.parse(newString);

				ctx.render('index.html',{
					username:cookie_name,
					title:'首页aa',
					buyoff: jsondata
				});
				console.log(jsondata)
			} else {	//没查到就返回0
				ctx.response.body = 0;
			}
		})
		.catch((err) => {
			// 查询发生错误
			ctx.response.body = 2;
		})
}