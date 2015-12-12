var cellNumWidth = 8 ;
var cellNumHeight = 11 ;
var cellNum = cellNumHeight * cellNumWidth ;
var eggs = Math.floor( cellNum / 4.8 );
var eggsUncovered = 0;
var list_Eggs = new Array();
var list_Empty = new Array();
var list_Uncovered = new Array();
var list_NumInCell = new Array(new Array());//如何声明一个二维数组？？

//生成地图
var cells = "";
var gameBox = $("gameBox");
for ( var i = 0 ; i < cellNumHeight ; i++){
	for( var j = 0 ; j < cellNumWidth ; j++){
		cells += "<div id='cell-"+j+"-"+i+"' onmousedown='uncover("+j+","+i+")'></div>" ;
		
	}
}
gameBox.innerHTML = cells ; 

//生成eggs
for ( var i = 1 ; i <= eggs ; i++){
	var x = getRandom(cellNumWidth);
	var y = getRandom(cellNumHeight);
	var cellOfEgg = $("cell-"+x+"-"+y);
	if( isEgg( x , y ) ) i--;
	else {
		CSS( $("cell-"+x+"-"+y) , EggDivBefore);
		list_Eggs[list_Eggs.length] = Array(x,y) ;
	};
}

//生成数字
for ( var i = 0 ; i < cellNumHeight ; i++){
	for( var j = 0 ; j < cellNumWidth ; j++){
		var count = eggsAround(j,i);
		if(count == 0 ) 
			list_Empty[list_Empty.length] = Array(j,i);
	}
}
//判断是否是egg
function isEgg(x,y,where){
	return isInArray( x , y , list_Eggs , where );
}
//判断是否是空白
function isEmpty(x,y,where){
	return isInArray( x , y , list_Empty ,where);
}
//判断是否是已被揭开
function isUncovered(x,y,where){
	return isInArray( x , y , list_Uncovered , where );
}

//周围egg个数
function eggsAround(j,i){
	var count = 0;
		for(var l = 0 ; l <= list_Eggs.length-1 ; l++){
			if( list_Eggs[l][0] == j-1 && list_Eggs[l][1] == i-1 ) count++;
			if( list_Eggs[l][0] == j && list_Eggs[l][1] == i-1 ) count++;
			if( list_Eggs[l][0] == j+1 && list_Eggs[l][1] == i-1 ) count++;
			if( list_Eggs[l][0] == j-1 && list_Eggs[l][1] == i ) count++;
			if( list_Eggs[l][0] == j+1 && list_Eggs[l][1] == i ) count++;
			if( list_Eggs[l][0] == j-1 && list_Eggs[l][1] == i+1 ) count++;
			if( list_Eggs[l][0] == j && list_Eggs[l][1] == i+1 ) count++;
			if( list_Eggs[l][0] == j+1 && list_Eggs[l][1] == i+1 ) count++;
		}
		return count;
}

//事件处理
function uncover(x,y){
	var cell = $("cell-"+x+"-"+y);
	//如果点开的从是未点开的
	if( !isUncovered( x , y ) ){
		list_Uncovered[list_Uncovered.length] = Array( x , y );
		if( eggsAround(x,y) != 0 )
			cell.innerHTML = eggsAround(x,y);
		//如果点开的从是未点开的,并且是egg
	if(isEgg(x,y)){
		CSS( cell , EggDivAfter );
		if(eggsUncovered == eggs-1)
			eggsEvent("bye");
		else
			eggsUncovered++;
		eggsEvent(isEgg(x,y,true));
		//如果点开的从是未点开的,并且是空格
	}else if( isEmpty( x , y ) == 1 || eggsAround(x,y) == 1){
		//找出所有需要处理的附近的空格
		var list_needToHandle = new Array();
			list_needToHandle[0] = Array( x , y );
		for (var i = 0 ; i < list_needToHandle.length ; i++ ){
			var x = list_needToHandle[i][0] ;
			var y = list_needToHandle[i][1] ;
		
		function addNeedToHandle(x,y){
			if( x >= 0 && y >= 0 && x < cellNumWidth && y < cellNumHeight ) {
				if( (isEmpty( x , y ) || getRandom(9) == 2) && !isUncovered( x , y )  )
					list_needToHandle[list_needToHandle.length] = Array( x , y ); 
				
			}
		}
		handleAround(x,y,addNeedToHandle);
		function needToUncover(x,y){
			if( !isEgg(x,y)  &&  !isUncovered( x,y ) && x >= 0 && y >= 0 && x < cellNumWidth && y < cellNumHeight  ){
				var cell = $("cell-"+x+"-"+y);
				if( eggsAround(x,y) != 0 )
					cell.innerHTML = eggsAround(x,y);
				cell.style.background = "white"; 
				list_Uncovered[list_Uncovered.length] = Array( x , y );
			}
		}
		
		handleAround(x,y,needToUncover);
		
		//style 设置
		cell.style.background = "white";

		}
		//如果点开的从是未点开的,是其他
	}else {	
	cell.style.background = "white";
	}
	}
	else if(isEgg(x,y)){
		eggsEvent(isEgg(x,y,true));
	}
}

//eggs event
function eggsEvent(thisEgg){
	gotoPage(thisEgg);
	switch (thisEgg){
		case 0: send("其实这是一个高中相片集合");send("一共精选了18张");send("只是和扫雷结合起来的EggSweeper");break;
		case 1: break;
		case 2: break;
		case 3: break;
		case 4: break;
		case 5: break;
		case 6: break;
		case 7: break;
		case 8: break;
		case 9: break;
		case 10: break;
		case 11: break;
		case 12: break;
		case 13: break;
		case 14: break;
		case 15: break;
		case 16: break;
		case 17: break;
		case 18: break;
		case "bye":send("致我们逝去的高中，bye");break;
		
	}
}

//通知plan 显示样式根据内容来确定，
var notification = $("notification");
var list_notification_g ;
function notify(){
	var list_notification = new Array();
	var isShowing = false ;
	var isDealing = 0 ;
	function send(content){//相当于这个变成程序的入口，参数都从这里进去？？？
		list_notification[list_notification.length] = content;
		list_notification_g = list_notification;
		if( !isShowing )
			startTimeCount();
	}
	function startTimeCount(){
		isShowing = true ;
		//showing
		html = notification.innerHTML + "<div><span>"+list_notification[isDealing]+"</span></div>";
		notification.innerHTML = html;
		(function (){
			var isDealingCahe = isDealing;
			setTimeout(function (){
				//通知ing的样式
				notification.style.zIndex = "20";
				CSS( notification.getElementsByTagName("div")[isDealingCahe] , notificationDivBefore );
			},50);
		})();
		//EndTimeCount
		(function (){
		var isDealingCahe = isDealing;
		var time = 1200 + list_notification[isDealingCahe].length*50 ;
		setTimeout(function (){
			isShowing = false ;
			isDealing++;
			//处理通知ed
			(function (){
			var isDealingCahe1 = isDealingCahe;
			setTimeout(function (){
				//通知ed的样式
				CSS( notification.getElementsByTagName("div")[isDealingCahe1] , notificationDivAfter );
			},50);
			})();
			if(isDealing > list_notification.length-1){
				setTimeout(function (){
					//check again
					if(isDealing > list_notification.length-1)
						notification.style.zIndex = -1;
				},500);
			}
			else{
				startTimeCount();
			}
		},time);
		})();
	}
	return send;
}
var send = notify();
send("ok");
send("ok1");

//send("<div>no ok </div>"); //传入div元素改变了notification下的div数量，以及序号，所以出现指向错误
							 //开来现在只有在这里面不使用div标签
//done: disappear delay depenes on string length


//中Egg的事件响应

function gotoPage(iEgg){
	$("pageOfEvent").getElementsByTagName("div")[iEgg].style.zIndex = "10";
	CSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventBefore );
	(function (){
		setTimeout(function (){
			CSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventIng );
		},50);
	})();
}

//循环绑定事件
(function (){
	for (var i = 0 ; i < $("pageOfEvent").getElementsByTagName("div").length; i++ ){
		(function (){
			var iCache = i;
			$("pageOfEvent").getElementsByTagName("div")[iCache].onclick = function (){
			CSS( $("pageOfEvent").getElementsByTagName("div")[iCache] , imgPageOfEventAfter );
			setTimeout(function (){
				$("pageOfEvent").getElementsByTagName("div")[iCache].style.zIndex = "-1";
			},300);
			}
		})();
	}
})();

//动画处理 

function CSS(elem,setstyle){//下一步模仿jquery中$().CSS({});
	for(var p in setstyle){
		elem.style[p] = setstyle[p];
	}
}
//要变化的样式表
var notificationDivBefore = {
	//background : "red",
	top : "0px",
	opacity : "1"
};
var notificationDivAfter = {
	//background : "white",
	top : "54px",
	opacity : "0"
};
var EggDivBefore = {
	color : "red"
};
var EggDivAfter = {
	color: "red",
	background : "red"
};
var imgPageOfEventBefore = {
	opacity: "0"
	//left: "180px"
};
var imgPageOfEventIng = {
	opacity: "1"
	//left: "0px"
};
var imgPageOfEventAfter = {
	opacity: "0"
	//left: "-180px"
};



//basic function 

document.onselectstart = function (){return false}
function $(elem){
	/*
	$.css : function ( attr ){
		if( attr == "background" ) return elem.style.background;
		if( attr == "top" ) return elem.style.background;
		if( attr == "left" ) return elem.style.background;
		if( attr == "right" ) return elem.style.background;
		if( attr == "bottom" ) return elem.style.background;
		if( attr == "background" ) return elem.style.background;
		if( attr == "background" ) return elem.style.background;
	}
	*/
	return document.getElementById(elem);
	
}

//处理x,y距离为1的方格
function handleAround(x,y,func){
	func(x-1,y-1);
	func(x,y-1);
	func(x+1,y-1);
	func(x-1,y);
	func(x+1,y);
	func(x-1,y+1);
	func(x,y+1);
	func(x+1,y+1);
}
//查找是否在某个数列中存在，二维
function isInArray( x , y , array , where ){
	var flag = 0 ;
	for (var i = 0 ; i <= array.length-1 ; i++)
		if( array[i][0] == x && array[i][1] == y ) 
			flag = (where == undefined ) ? 1 : i;
	return flag;
}

//生成自定义范围的随机数 
function getRandom( range_Start , range_Stop){ 
	//注：如果想生成0到9的随机数，需要写成0-10，因为使用floor处理
	////：如果只有一个参数，默认start为0
	if (range_Stop == undefined ){ range_Stop = range_Start ; range_Start = 0 ; }
	return Math.floor(Math.random()*(range_Stop - range_Start))+range_Start ;
}


//learning log


/*//对象的枚举
var notificationDivAfter = {
	background : "",
	top : "",
	//opacity : 
};
for(var p in notificationDivAfter){
	alert(p+"--"+notificationDivAfter[p]);
}
*/

///把一个obj中的属性与另一个obj中有相同名字的属性设置相同，

/*
function setE(elem,setstyle){
	elem.style = setstyle;
	for(var p in setstyle){
		for(var i in elem.style){
			if( p == i ) 
				elem.style[p] = setstyle[p] ;
		}
		//然后我发现是通过[p]来读取style中p的属性，就意味着elem.style[p] = setstyle[p] ;就就行了！！！
		
		//elem.style.p = setstyle[p]; //这个行不通应为p并不能代表style里面的p所指向的属性名字
		//elem.style.background = "red";
		//console.log(elem);
		//console.log(p+":"+elem.style.p);
		//console.log(elem.style.background);
		//console.log(elem.style.top);
		//console.log(elem.style.opacity);
	}
}
*/