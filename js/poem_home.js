var request;
var poems = new Array();
var current = null;

function Poem(id, title, lines) {
	this.id = id;
	this.title = title;
	this.lines = lines;
}

function refresh() {
	var h = window.innerHeight;
	loadPoems();
	document.getElementById("b_area").style.height = h;
}

function updateContent(title) {
	var poem = null;
	for(j = 0, l = poems.length; j < l; j++) {
		if(poems[j].title == title) {
			poem = poems[j];
			break;
		}
	}
	console.log(poem.title);
	if(poem != null) {
		document.getElementById("content").innerText = poem.lines;
	}
	var titles = document.getElementsByClassName("poem_title");
	for(j = 0, l = titles.length; j < l; j++) {
		if(current != null && current == titles[j].innerText) {
			titles[j].style.color = "#555555";
		}
		if(title == titles[j].innerText) {
			titles[j].style.color = "#0075C9";
		}
	}

	current = title;
}

function loadPoems() {
	poems.splice(0, poems.length); //清空数组
	//构造get请求获取文件
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		request = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(request) {
		request.open("GET", "data/poem.txt", true);
		request.onreadystatechange = function() {
			if(request.readyState === 4) {
				if(request.status == 200 || request.status == 0) {
					var txt = request.responseText;
					var lineTxt = txt.split("\r\n");
					var poem = null;
					var contentNext = false;
					for(j = 0, len = lineTxt.length; j < len; j++) {
						var line = lineTxt[j];
						if(line.indexOf("ID=") != -1) { //按ID查询

							if(poem != null) { //存储前一首poem
								poems.push(poem);
							}
							var id = line.substring(3, lineTxt.length);
							poem = new Poem();
							poem.id = id;
							contentNext = false;
						} else if(!contentNext) { // 填写标题
							poem.title = line;
							contentNext = true;
						} else {
							var lines = poem.lines;
							if(lines != null && lines.length != 0) {
								lines = lines + "\r\n";
							} else lines = "";
							lines += line;
							poem.lines = lines;
						}
					}
					if(poem != null) { //存储最后一首
						poems.push(poem);
					}
					for(j = 0, len = poems.length; j < len; j++) {
						var lii = "<li><a class=\"poem_title\" href=\"#\" onclick=\"updateContent('" + poems[j].title + "')\">" + poems[j].title + "</a></li>";
						console.log(lii);
						document.getElementById("title_list").innerHTML += lii;
					}
				}
			}
		}
		request.send(null);
	} else {
		alert("error");
	}
}