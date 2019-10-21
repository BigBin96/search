const nunjucks = require('nunjucks');

function createEnv(path,opts){
	// 查找view的路径
	 var
		opts = Object.assign({}, opts || {});
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache === undefined ? false : opts.noCache,
        watch = opts.watch === undefined ? false : opts.watch,
        throwOnUndefined = opts.throwOnUndefined === undefined ? false : opts.throwOnUndefined,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

function templating(path,opts){
	// 创建Nunjucks的env对象:
    var env = createEnv(path, opts);
	
    return async (ctx,next) => {
		ctx.render = function(view,model){
			// 把render后的内容赋值给response.body:
			ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
			// 设置Content-Type:
			ctx.response.type = 'text/html';
		}
		await next();
	}
}


module.exports = templating;