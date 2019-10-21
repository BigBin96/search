const fs = require('fs');

function getModel(dir){
	var Dir = dir || __dirname + '/model';
	var filename = fs.readdirSync(Dir);
	var js_file = filename.filter((item) => {
		return item.endsWith('.js');
	});
	
	var model ={};
	
	js_file.map((item,index,self) => {
		var modelName = item.substr(0,item.indexOf('.'));
		model[modelName] = require(Dir + '/' + item);
		return;
	})
	
	return model;
}

module.exports = getModel;