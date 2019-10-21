// 注册事件
function onregister(e){
	e.preventDefault();
	
	// 注册信息验证>>
	var reg_name = /[\S]{1,8}/,
		reg_pwd = /[\w]{6,12}/,
		reg_add = /[\S]{1,40}/,
		reg_emi = /^[\w]+@[\w]+\.(com|org)$/,
		reg_mob = /^1[\d]{10}/,
		username = document.getElementById('username').value,
		password = document.getElementById('password').value,
		password2 = document.getElementById('password2').value,
		address = document.getElementById('address').value,
		email = document.getElementById('email').value,
		mobile = document.getElementById('mobile').value;

		if(!reg_name.test(username)){
			return alert('请使用规范的用户名！')
		}
		if(password !== password2){
			return alert('两次密码输入不一致！')
		}
		if(!reg_pwd.test(password)){
			return alert('请输入规范的密码！')
		}
		if(!reg_add.test(address)){
			return alert('请输入规范的地址！')
		}
		if(!reg_emi.test(email)){
			return alert('邮箱格式不正确！')
		}
		if(!reg_mob.test(mobile)){
			return alert('请输入正确的手机号码！')
		}
		
		var data = {
			username : username,
			password : password,
			address : address,
			email : email,
			mobile : mobile
		};
		console.log(data);
			
		axios.post('/register_post',data)
			.then(function(response){
				console.log(response)
				if(response.data == 1){
					alert('注册成功！');
					
					// 自动跳转到登录页
					location.pathname = '/login';
				} else if(response.data == 2) {
					alert('用户名已存在！');
				} else {
					alert('发生错误，注册失败！');
				}
			}).catch(function(err){
				console.log(err);
			})
		
}


// 登录事件
function onlogin(e){
	e.preventDefault();
	var data = {
		username : document.getElementById('username').value,
		password : document.getElementById('password').value,
	};
	console.log(data);
	
	axios.post('/login_post',data)
	.then((result) => {
		console.log(result);
		if(result.data == 1){
			alert('登录成功！')
			
			// 跳转到首页
			window.location.pathname = '/';
		} else if(result.data == 2){
			alert('账号或密码错误！')
		} else {
			alert('服务器错误！')
		}
	})
	.catch((err) => {
		alert('网络错误！')
	})
}

// 退出登录
function onlogout(){
	axios.get('/logout')
	.then((result) => {
		if(result.data == 1){	
			//退出成功,返回登录页
			alert('已退出，即将回到登录页！')
			
			location.pathname = '/login';
		} else {
			// 退出失败
			alert('服务器错误，退出失败！')
		}
	})
	.catch((err) => {
		console.log('网络错误！')
	})
}

// 搜索
function onsearchb(){
	var data = {
		search_word: document.getElementById('search').value
	}
	console.log(data);

	axios.post('/search',data)
		.then((result) => {
			console.log(result);
			if(result.data == 0){
				alert('未找到相关搜索！')
			} else if(result.data == 2){
				alert('服务器错误！')
			} else {
				alert('找到如下搜索结果！')
			}
		})
		.catch((err) => {
			console.log('网络错误！')
		})
}