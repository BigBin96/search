// 挂载routes
function addMapping(router,mapping){	//把一个模块中的路由添加到router对象中
	for(var n in mapping){
		if(n && n.startsWith('GET ')){
			router.get(n.substring(4), mapping[n]);
			console.log(`routes: ${n}`);
		} else if(n && n.startsWith('POST ')){
			router.post(n.substring(5), mapping[n]);
			console.log(`routes: ${n}`);
		}else{
			console.log(`|${n}--${mapping}| Not the name of the specification`);
		}
	}
};

function execAddMap(router){	
	addMapping(router,require('./controllers/main.js'));
	return router.routes();
}

module.exports = execAddMap;