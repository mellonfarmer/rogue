var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//Global variables
//holds the list of rooms
var arrRooms = [];

var GRID_SIZE = 9; 

var currentLevel = 0;
const DEFAULT_ROOMS = 10;

//Funcitons
function fncFindCenter(){
	//get center 
	var mapCenter = Math.floor(GRID_SIZE / 2);
	//alert(mapCenter);
	$("#" + mapCenter + mapCenter).css("backgroundColor", "rgb(255,0,0)");
	
	
}


function fncClearGrid(){
	//change to blacnk each item in the graphic of the grid rather than distrying the layout
	$(".grid-item").remove();
}

//main function to generate and draw the map
function fncCreateMap(){
	//will have difficulty passed as integar to allow more rooms to be created
	$(function(){
		
		var rooms = fncLoadRooms();
		var autoSize = "";
		fncClearGrid();
		fncGenerateRoomArray();


		//gridID = 0;
		for (var i = 0;  i < GRID_SIZE ; i++) {
			autoSize = autoSize + "auto "
		}

		$(".grid-container").css('grid-template-columns', autoSize);

		for (var rows = 0; rows < GRID_SIZE ;rows ++){

			for (var columns = 0; columns < GRID_SIZE ; columns++) {
				$(".grid-container").append('<div class="grid-item" id="' +  rows + columns + '"></div>')
			}
		}

		fncDrawMap(GRID_SIZE, GRID_SIZE);
	});
}

//loads room types to be used llater
function fncLoadRooms(){
	var rooms = [];
	function CreateObjectItem(id, name, colour)
	{
		var room = new Object();
		room.id = id;
		room.name = name;
		room.colour = colour;
		rooms.push(room);
	}

	CreateObjectItem(0,"noroom","rgb(110,110,110)"); //black
	CreateObjectItem(1,"room","rgb(200,200,200)"); //white/gray
	CreateObjectItem(2,"player","rgb(0,200,0)"); //green
	CreateObjectItem(3,"tresure","rgb(200,200,0)"); //yellow
	CreateObjectItem(4,"exit","rgb(200,0,0)"); //red 
	return rooms;
}



//Generates the rooms call only when new level is loaded
function fncGenerateRoomArray(){
	//clear exsisting room array
	arrRooms.length = 0;
	tempArray =[];
	//initial generation
	function CreateObjectItem(idx, idy, roomType)
	{
		var room = new Object();
		room.idx = idx;
		room.idy = idy;
		room.roomType = roomType;
		tempArray.push(room);
		//return room;
	}
	function generateRandomID(){
		//uncoment below to generate colour blocks everywhere :D
		return Math.floor(Math.random()*5);

			//if( arrRooms.length < (DEFAULT_ROOMS + currentLevel) ){
			//	return 1;
			//}else{
			//	return 0;
			//}
		
	}

	for (var idy = 0 ; idy  <= (GRID_SIZE) ; idy++){
		for (var idx = 0 ; idx  <= (GRID_SIZE) ; idx++){
			var tempRandom = generateRandomID();
			//CreateObjectItem(idx,idy,tempRandom); //white/gray
			CreateObjectItem(idx,idy,0); //white/gray

		}
		arrRooms[idy] = tempArray;
		tempArray = [];
	}
}


/*
Map rules:

must have the player
must have an exit
must have atleast one tresure room
amount of rooms increases every level
anything not a walkable room is black
*/

function basicMap(){
	//get center 
	var mapCenter = Math.floor(GRID_SIZE / 2);
	

}

//bubble sort for testing
function bubbleSort(arr){
   var len = arr.length;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       if(arr[j-1]>arr[j]){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}








function sortArray(){
//44 is the center
var rooms = fncLoadRooms();
	arrRooms.sort(function(a,b){return a.id - b.id});
	fncDrawMap();

}



//only change the display, need it to hold the data in an arry so the map doesnt change 
//https://stackoverflow.com/questions/12583400/javascript-scope-of-nested-for-loop-index
//fixed by adding pramaters for the row and column count
function fncDrawMap(rowCount, columnCount){
	var rooms = fncLoadRooms();
	var roomLength = arrRooms.length;

	for (var idx = 0 ; idx  <= rowCount ; idx++){
		for (var idy = 0 ; idy  <= columnCount ; idy++){
			$("#" +idx + idy + ".grid-item").css('backgroundColor', rooms[(arrRooms[idx][idy].roomType)].colour);
			//$("#" +idx + idy + ".grid-item").text(arrRooms[idx][idy].idy + "," + arrRooms[idx][idy].idx);

		}
	}

}