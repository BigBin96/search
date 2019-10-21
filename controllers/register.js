const dbquery = require('../connection/mysql-connect.js');

module.exports = async (ctx,next) => {
	var data = ctx.request.body,
		data_arr = [];
		
		for(var n in data){
			data_arr.push(data[n])
		};
	var selectsql = `select * from user where username='${data.username}'`;
	var insertsql = `insert into user(username,userpwd,email,address,mobile) values(?,?,?,?,?)`;
	
	await dbquery(selectsql)
	.then(async (result) => {	//	select成功
		//用户名不存在
		if(result.length == 0){
			await dbquery(insertsql,data_arr)
			.then((result) => {	//注册成功
				ctx.response.body = 1;
			})
			.catch((err) => {	//	发生错误
				ctx.response.body = 0;
			})
		} else {	//用户名已存在
			ctx.response.body = 2;
		}
		
	})
	.catch((err) => {		//	发生错误
		ctx.response.body = 0;
	})
}