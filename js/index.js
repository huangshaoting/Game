window.onload = function() {
	var canvas = document.getElementById("box");
	var oContext = canvas.getContext("2d");
	var u = 0;
	var bull = [];
	//	bull[0]={ //小圆运动路径
	//		x:300, //x,	y：初始圆运动位置
	//		y:0, 
	//		startx:300,
	//		starty:0,
	//		num:0, //弧度
	//		r:250 //围绕圆运动半径
	//	}
	var img = new Image();

	img.src = "img/person.png";
	img.onload = function() {

			setInterval(function(){
				bull.push({
					x:300, //x,	y：初始圆运动位置
					y:0, 
					startx:300,
					starty:0,
					num:0, //弧度
					r:250 //围绕圆运动半径
				});
			},400);
		var bullet = [];
		canvas.onclick = function(ev) {
			var ev = ev || window.event;
			var oThisX = ev.clientX - canvas.offsetLeft;
			var oThisY = ev.clientY - canvas.offsetTop;

			var a = oThisX - 300;
			var b = oThisY - 250;
			var c = Math.sqrt(a * a + b * b);
			var speed = 5;
			var xs = speed * a / c;
			var ys = speed * b / c;
			bullet.push({
				x: 300,
				y: 250,
				xs: xs,
				ys: ys
			});
		}

		setInterval(function() {
			for(var i = 0; i < bull.length; i++) {
				bull[i].num++;
				if(bull[i].num == 270) {
					bull[i].startx = 270;
					bull[i].starty = 30;
					bull[i].r = 220;
				} else if(bull[i].num == 450) {
					bull[i].startx = 300;
					bull[i].starty = 60;
					bull[i].r = 190;
				} else if(bull[i].num == 630) {
					bull[i].startx = 270;
					bull[i].starty = 90;
					bull[i].r = 160;
				}
				else if(bull[i].num == 630 + 180) {
					alert("游戏结束");
					window.location.reload();
				}
				bull[i].x = bull[i].startx + bull[i].r * Math.sin(bull[i].num * Math.PI / 180);
				bull[i].y = bull[i].r - bull[i].r * Math.cos(bull[i].num * Math.PI / 180) + bull[i].starty;
			}
			for(var i = 0; i < bullet.length; i++) {
				bullet[i].x = bullet[i].x + bullet[i].xs;
				bullet[i].y = bullet[i].y + bullet[i].ys;
			}
			for(var i=0;i<bull.length;i++){
				for(var j=0;j<bullet.length;j++){
					if(pz(bull[i].x,bull[i].y,bullet[j].x,bullet[j].y)){
						bull.splice(i,1);
						bullet.splice(i,1);
						break;
					}
				}
			}
		}, 30);

		setInterval(function() {
			oContext.clearRect(0, 0, canvas.width, canvas.height);
			// 绘制第一个圆
			oContext.beginPath();
			oContext.arc(300, 250, 250, -90 * Math.PI / 180, 180 * Math.PI / 180, false);
			oContext.stroke();
			oContext.closePath();
			// 绘制第二个圆
			oContext.beginPath();
			oContext.arc(270, 250, 220, 180 * Math.PI / 180, 360 * Math.PI / 180, false);
			oContext.stroke();
			oContext.closePath();
			// 绘制第三个圆
			oContext.beginPath();
			oContext.arc(300, 250, 190, 0, 180 * Math.PI / 180, false);
			oContext.stroke();
			oContext.closePath();
			// 绘制第四个圆
			oContext.beginPath();
			oContext.arc(270, 250, 160, 180 * Math.PI / 180, 360 * Math.PI / 180, false);
			oContext.stroke();
			oContext.closePath();
			// 绘制终点小圆
			oContext.beginPath();
			oContext.arc(430, 250, 20, 0, 360 * Math.PI / 180, false);
			oContext.stroke();
			oContext.closePath();
			for(var i = 0; i < bull.length; i++) {
				oContext.beginPath();
				oContext.arc(bull[i].x, bull[i].y, 20, 0, 360 * Math.PI / 180, false);
				oContext.closePath();
				oContext.stroke();
				oContext.fill();
			}
			//绘制青蛙
			oContext.save();
			oContext.beginPath();
			oContext.translate(300, 250);
			oContext.rotate(iround);
			oContext.translate(-40, -40);
			oContext.drawImage(img, 0, 0);
			oContext.closePath();
			oContext.restore();
			//绘制子弹
			for(var i = 0; i < bullet.length; i++) {
				oContext.save();
				oContext.fillStyle = "red";
				oContext.beginPath();
				oContext.arc(bullet[i].x, bullet[i].y, 20, 0, 360 * Math.PI / 180, false);
				oContext.stroke();
				oContext.fill();
				oContext.restore();
				oContext.closePath();
			}
		}, 1000 / 24);
	}
	var iround = 0;
	canvas.onmousemove = function(ev) {
		var ev = ev || window.event;
		var oThisX = ev.clientX - canvas.offsetLeft;
		var oThisY = ev.clientY - canvas.offsetTop;
		var a = oThisX - 300;
		var b = oThisY - 250;
		console.log(a + "," + b);
		var c = Math.sqrt(a * a + b * b);
		//console.log(c);
		if(a > 0 && b > 0) {
			iround = Math.asin(b / c) + 90 * Math.PI / 180;
		} else if(a > 0 && b < 0) {
			iround = Math.asin(a / c);
		} else if(a < 0 && b > 0) {
			iround = -(Math.asin(b / c) + 90 * Math.PI / 180);
		} else if(a < 0 && b < 0) {
			iround = Math.asin(a / c);
		}
	}
	function pz(x1,y1,x2,y2){
		var a = x1-x2;
		var b = y1-y2;
		var c = Math.sqrt(a*a+b*b);
		if(c<40){
			return true;
		}else{
			return false;
		}
	}
}