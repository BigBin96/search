const mysql = require('mysql');
const configure = require('./mysql-configure.json');

function querySql(sql,params){
	return new Promise((resolve,rejuct) => {
		var connection = mysql.createConnection(configure);
		
		// 打开连接
		connection.connect();	
		
		if(params){
			connection.query(sql,params,(err,result) => {
				if(err){
					rejuct('fail');
				}else{
					resolve(result);
				}
			});
		} else {
			connection.query(sql,(err,result) => {
				if(err){
					rejuct('fail');
				}else{
					resolve(result);
				}
			});
		}
		
		// 关闭连接
		connection.end();
	})
}


module.exports = querySql;