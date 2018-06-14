//9*16 = 144
var totalMine = 27;
var mineMatrix = new Array(144);
var invisedMatrix = new Array(144);
var notInversed = 144 - totalMine;
var arroundNum = new Array(144);
var failed = false;

//用于屏蔽鼠标右键
function doNothing() {
	window.event.returnValue = false;
	return false;
}

function fill(n, x, y) {
	//第x行第y个方块
	var tb = document.getElementById("mytab").rows[x].childNodes[y * 2 + 1];
	switch(n) {
		case -2: //雷
			tb.bgColor = "#D81E06";
			break;
		case -1: //未被翻开
			tb.bgColor = "#404040";
			tb.innerText = "";
			break;
		case 0: //翻开无数字
			tb.bgColor = "#ffffff"
			break;
		default:
			tb.bgColor = "#ffffff";
			tb.innerText = n;
	}

}

function refresh() {
	var restMine = totalMine;
	notInversed = 144 - totalMine;
	failed = false;
	for(var i = 0; i < 144; i++) {
		mineMatrix[i] = 0;
		invisedMatrix[i] = 0;
		arroundNum[i] = 0;
		fill(-1, Math.floor(i / 16), i % 16);
	}
	while(restMine > 0) {
		var index = Math.floor(Math.random() * 144);
		if(mineMatrix[index] == 0) {
			mineMatrix[index] = 1;
			restMine--;
		}
	}
	for(var i = 0; i < 144; i++) {
		arroundNum[i] += i > 15 && i % 16 > 0 ? mineMatrix[i - 17] : 0; //左上
		arroundNum[i] += i % 16 > 0 ? mineMatrix[i - 1] : 0; //左
		arroundNum[i] += i < 128 && i % 16 > 0 ? mineMatrix[i + 15] : 0; //左下
		arroundNum[i] += i < 128 ? mineMatrix[i + 16] : 0; //下
		arroundNum[i] += i < 128 && i % 16 < 15 ? mineMatrix[i + 17] : 0; //右下
		arroundNum[i] += i % 16 < 15 ? mineMatrix[i + 1] : 0; //右
		arroundNum[i] += i > 15 && i % 16 < 15 ? mineMatrix[i - 15] : 0; //右上
		arroundNum[i] += i > 15 ? mineMatrix[i - 16] : 0; //上
	}
}

function clickTb(index) {
	if(invisedMatrix[index] == 1 || failed) {
		return;
	} else if(mineMatrix[index] == 1) {
		failed = true;
		fill(-2, Math.floor(index / 16), index % 16);
	} else {
		inverse(index);
		if(notInversed <= 0) {
			showEntrance();
		}
	}
}

function inverse(i) {
	if(invisedMatrix[i] == 1) return;
	if(arroundNum[i] == 0) {
		fill(0, Math.floor(i / 16), i % 16);
		invisedMatrix[i] = 1;
		notInversed--;
		if(i > 15 && i % 16 > 0) inverse(i - 17);
		if(i % 16 > 0) inverse(i - 1);
		if(i < 128 && i % 16 > 0) inverse(i + 15);
		if(i < 128) inverse(i + 16);
		if(i < 128 && i % 16 < 15) inverse(i + 17)
		if(i % 16 < 15) inverse(i + 1);
		if(i > 15 && i % 16 < 15) inverse(i - 15);
		if(i > 15) inverse(i - 16);
	} else {
		fill(arroundNum[i], Math.floor(i / 16), i % 16);
		invisedMatrix[i] = 1;
		notInversed--;
	}
}

//显示扫雷秘籍入口
function showEntrance() {
	var box = document.getElementById("sweep_");
	if(box.childElementCount == 1)
		box.innerHTML += "<a  href=\"blog/blog_home.jsp\">『扫雷秘籍』</a>";
}