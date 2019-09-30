function fncMove(Direction) {

	var Position = window.getComputedStyle(box1);

	var Xnumber = parseInt(Position.marginLeft);
	//number =  number + 10;

	//var Ynumber = parseInt(Position.marginLeft);
	//number =  number + 10;

	var Ynumber = parseInt(Position.marginTop);
	

	switch(Direction){
		case "UP":
			Ynumber =  Ynumber - 10;
			break;
		case "DOWN":
			Ynumber =  Ynumber + 10;
			break;
		case "LEFT":
			Xnumber =  Xnumber - 10;
			break;
		case "RIGHT":
			Xnumber =  Xnumber + 10;
			break;


	}
	//$(document).ready(function(){
		$("#box1").css('marginLeft', Xnumber);
		$("#box1").css('marginTop', Ynumber);
	//}
	//document.getElementById("box1").style.marginLeft = Xnumber;
	//document.getElementById("box1").style.marginTop = Ynumber;
	document.getElementById("info").innerHTML = "Left: " + Position.marginLeft + "  " + "  " + "Top: " + Position.marginTop;

}function fncMouseOver(obj){
	obj.style.backgroundColor = "blue";

}
function fncMouseOut(obj){
	obj.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
}