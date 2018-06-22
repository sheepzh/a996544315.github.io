var things = new Array;

function loadThings() {
	things.splice(0, things.length); //清空数组
	//构造get请求获取文件
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(request) {
		request.open("GET", "data/things.txt", true);
		request.onreadystatechange = function() {
			if(request.readyState === 4) {
//				if(request.status == 200 || request.status == 0) {
					var lines = request.responseText.split("\r\n");
					for(var j = 0; j < lines.length; j++) {
						var nn = Math.floor(j / 4);
						var toAdd = "`"+lines[j];
						things[nn] += ("`" + lines[j]);
					}
					for(var j = 0; j < things.length; j++) {
						var tile = things[j];
						var contents = tile.split("`")
						var toAdd = "<div style=\"width: 100%;margin-top: 100px;height: auto;\"><div style=\"width: 100%;height: auto;margin-bottom:24px;text-align: center;font-size: 25px;\"><a class=\"_title\" href=\"" + contents[1];
						toAdd += "\" target=\"_blank\">";
						toAdd += contents[2];
						toAdd += "</a></div><div style=\"width: 60%;margin: auto;text-align: center;\"><p class=\"_date\">";
						toAdd += contents[3];
						toAdd += "</p><p class=\"_short\">";
						toAdd += contents[4];
						toAdd += "</p></div></div>"
						document.getElementById("nothing_content").innerHTML += toAdd;
					}
				}
			}
//		}
		request.send(null);
	} else {
		alert("error");
	}

}