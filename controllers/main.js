const model = require('../getmodel.js')().main;

// 首页
var fn_index = require('./index.js');

// 登录页
var fn_login = async (ctx,next) => {
	ctx.render('login.html',model.login);
}

// 注册页
var fn_register = async (ctx,next) => {
	ctx.render('register.html',model.register);
}

// 响应注册
var fn_register_post = require('./register.js');

// 响应登录
var fn_login_post = require('./login.js');

// 退出登录
var fn_logout = require('./logout.js');

// 响应搜索
var fn_search_post = require('./search.js');




module.exports = {	//	键为路由路径,值为处理事件
	"GET /": fn_index,
	"GET /login": fn_login,
	"GET /register": fn_register,
	"GET /logout": fn_logout,
	"POST /register_post": fn_register_post,
	"POST /login_post": fn_login_post,
	"POST /search": fn_search_post
}