var relList = new Array;

function loadRels() {
	relList.splice(0, relList.length); //清空数组
	//构造get请求获取文件
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(request) {
		request.open("GET", "../data/rel.txt", true);
		request.onreadystatechange = function() {
			if(request.readyState === 4) {
				if(request.status == 200 || request.status == 0) {
					var txt = request.responseText;
					relList = txt.split("\r\n");
					console.log(getRel("意象", 20))
				}
			}
		}
		request.send(null);
	} else {
		alert("error");
	}

}

function getRel(word, limitN) {
	if(limitN == null) {
		limitN = 5;
	}
	var ret = null;
	for(j = 0, l = relList.length; j < l; j++) {
		if(relList[j].indexOf(word) == 0) {
			var desc = relList[j].split(":");
			var n = Math.min(limitN, desc.length - 1);
			ret = new Array;
			for(i = 0; i < n; i++) {
				ret[i] = desc[i + 1];
			}
			break;
		}
	}
	return ret;
}