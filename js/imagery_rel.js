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
					document.getElementById("tips").innerHTML = "请输入一个『意象』 e.g. " + getRand2();
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

function getRand2() {
	var v1 = Math.floor(Math.random() * (relList.length-9));
	var v2 = Math.floor(Math.random() * (relList.length-9));

	var s1 = relList[v1].split(':')
	txt1 = s1[0];
	var ret = "<a href=\"#\" onclick=\"searchRel('" + txt1 + "')\" style=\"text-decoration: none;color: #009BDF;\">" + txt1 + "</a>";
	if(v1 != v2) {
		s1 = relList[v2].split(":");
		txt1 = s1[0];
		ret += (" " + "<a href=\"#\" onclick=\"searchRel('" + txt1 + "')\" style=\"text-decoration: none;color: #009BDF;\">" + txt1 + "</a>");
	}
	return ret;
}

function searchRel(word) {
	document.getElementById("imagery_input").value = word;
	document.getElementById("_showRel").click();
}