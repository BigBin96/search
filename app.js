const Koa = require('koa'),
	  app = new Koa(),
	  Router = require('koa-router'),
	  router = new Router(),
	  bodyParser = require('koa-bodyparser'),
	  record = require('./record.js'),
	  addrouter = require('./controller.js'),
	  addview = require('./view.js'),
	  staticFiles = require('./static-files.js');
	  
	   
// 记录应用加载时间
app.use(record);

// 加载静态资源
app.use(staticFiles('/static/', __dirname + '/static'));

// 挂载bodyParser方法
app.use(bodyParser());

// 给ctx添加render()方法
app.use(addview());

// 注册并挂载路由
app.use(addrouter(router));
	  
// 监听端口
app.listen(3666);

console.log('--------------appliction runing success!--------------');