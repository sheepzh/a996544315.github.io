//无缝登录

var state = 0; //0隐藏,1登录显示,2注册显示

function showLogin() {
	state = 1;
	document.getElementById("lg_fl").style.display = "inline-block";
	document.getElementById("rg_fl").style.display = "nones";
}

function showRegister() {
	state = 2;
	document.getElementById("lg_fl").style.display = "none";
	document.getElementById("rg_fl").style.display = "inline-block";
}

function login() {

}

function exist() {
	var url = "../user/exist/";
	url += document.getElementById("rg_ac").textContent;
	$.get(url, function(data) {
		if(data.success_flag == false) {
			alert("账号已存在")
		}
	})
}

function register() {}

function closeFloat() {
	state = 0;
	document.getElementById("lg_fl").style.display = "none";
	document.getElementById("rg_fl").style.display = "none";

}