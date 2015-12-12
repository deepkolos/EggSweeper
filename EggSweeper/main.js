var cellNumWidth = 8 ;
var cellNumHeight = 11 ;
var cellNum = cellNumHeight * cellNumWidth ;
var eggs = Math.floor( cellNum / 4.8 );
var eggsUncovered = 0;
var list_Eggs = new Array();
var list_Empty = new Array();
var list_Uncovered = new Array();
var list_NumInCell = new Array(new Array());//�������һ����ά���飿��

//���ɵ�ͼ
var cells = "";
var gameBox = $("gameBox");
for ( var i = 0 ; i < cellNumHeight ; i++){
	for( var j = 0 ; j < cellNumWidth ; j++){
		cells += "<div id='cell-"+j+"-"+i+"' onmousedown='uncover("+j+","+i+")'></div>" ;
		
	}
}
gameBox.innerHTML = cells ; 

//����eggs
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

//��������
for ( var i = 0 ; i < cellNumHeight ; i++){
	for( var j = 0 ; j < cellNumWidth ; j++){
		var count = eggsAround(j,i);
		if(count == 0 ) 
			list_Empty[list_Empty.length] = Array(j,i);
	}
}
//�ж��Ƿ���egg
function isEgg(x,y,where){
	return isInArray( x , y , list_Eggs , where );
}
//�ж��Ƿ��ǿհ�
function isEmpty(x,y,where){
	return isInArray( x , y , list_Empty ,where);
}
//�ж��Ƿ����ѱ��ҿ�
function isUncovered(x,y,where){
	return isInArray( x , y , list_Uncovered , where );
}

//��Χegg����
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

//�¼�����
function uncover(x,y){
	var cell = $("cell-"+x+"-"+y);
	//����㿪�Ĵ���δ�㿪��
	if( !isUncovered( x , y ) ){
		list_Uncovered[list_Uncovered.length] = Array( x , y );
		if( eggsAround(x,y) != 0 )
			cell.innerHTML = eggsAround(x,y);
		//����㿪�Ĵ���δ�㿪��,������egg
	if(isEgg(x,y)){
		CSS( cell , EggDivAfter );
		if(eggsUncovered == eggs-1)
			eggsEvent("bye");
		else
			eggsUncovered++;
		eggsEvent(isEgg(x,y,true));
		//����㿪�Ĵ���δ�㿪��,�����ǿո�
	}else if( isEmpty( x , y ) == 1 || eggsAround(x,y) == 1){
		//�ҳ�������Ҫ����ĸ����Ŀո�
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
		
		//style ����
		cell.style.background = "white";

		}
		//����㿪�Ĵ���δ�㿪��,������
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
		case 0: send("��ʵ����һ��������Ƭ����");send("һ����ѡ��18��");send("ֻ�Ǻ�ɨ�׽��������EggSweeper");break;
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
		case "bye":send("��������ȥ�ĸ��У�bye");break;
		
	}
}

//֪ͨplan ��ʾ��ʽ����������ȷ����
var notification = $("notification");
var list_notification_g ;
function notify(){
	var list_notification = new Array();
	var isShowing = false ;
	var isDealing = 0 ;
	function send(content){//�൱�������ɳ������ڣ��������������ȥ������
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
				//֪ͨing����ʽ
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
			//����֪ͨed
			(function (){
			var isDealingCahe1 = isDealingCahe;
			setTimeout(function (){
				//֪ͨed����ʽ
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

//send("<div>no ok </div>"); //����divԪ�ظı���notification�µ�div�������Լ���ţ����Գ���ָ�����
							 //��������ֻ���������治ʹ��div��ǩ
//done: disappear delay depenes on string length


//��Egg���¼���Ӧ

function gotoPage(iEgg){
	$("pageOfEvent").getElementsByTagName("div")[iEgg].style.zIndex = "10";
	CSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventBefore );
	(function (){
		setTimeout(function (){
			CSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventIng );
		},50);
	})();
}

//ѭ�����¼�
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

//�������� 

function CSS(elem,setstyle){//��һ��ģ��jquery��$().CSS({});
	for(var p in setstyle){
		elem.style[p] = setstyle[p];
	}
}
//Ҫ�仯����ʽ��
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

//����x,y����Ϊ1�ķ���
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
//�����Ƿ���ĳ�������д��ڣ���ά
function isInArray( x , y , array , where ){
	var flag = 0 ;
	for (var i = 0 ; i <= array.length-1 ; i++)
		if( array[i][0] == x && array[i][1] == y ) 
			flag = (where == undefined ) ? 1 : i;
	return flag;
}

//�����Զ��巶Χ������� 
function getRandom( range_Start , range_Stop){ 
	//ע�����������0��9�����������Ҫд��0-10����Ϊʹ��floor����
	////�����ֻ��һ��������Ĭ��startΪ0
	if (range_Stop == undefined ){ range_Stop = range_Start ; range_Start = 0 ; }
	return Math.floor(Math.random()*(range_Stop - range_Start))+range_Start ;
}


//learning log


/*//�����ö��
var notificationDivAfter = {
	background : "",
	top : "",
	//opacity : 
};
for(var p in notificationDivAfter){
	alert(p+"--"+notificationDivAfter[p]);
}
*/

///��һ��obj�е���������һ��obj������ͬ���ֵ�����������ͬ��

/*
function setE(elem,setstyle){
	elem.style = setstyle;
	for(var p in setstyle){
		for(var i in elem.style){
			if( p == i ) 
				elem.style[p] = setstyle[p] ;
		}
		//Ȼ���ҷ�����ͨ��[p]����ȡstyle��p�����ԣ�����ζ��elem.style[p] = setstyle[p] ;�;����ˣ�����
		
		//elem.style.p = setstyle[p]; //����в�ͨӦΪp�����ܴ���style�����p��ָ�����������
		//elem.style.background = "red";
		//console.log(elem);
		//console.log(p+":"+elem.style.p);
		//console.log(elem.style.background);
		//console.log(elem.style.top);
		//console.log(elem.style.opacity);
	}
}
*/