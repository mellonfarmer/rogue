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


var roomTypes = fncLoadRooms();

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
		
		var rooms = roomTypes;
		var autoSize = "";
		fncClearGrid();
		fncGenerateRoomArray();


		//gridID = 0;
		for (var i = 0;  i < GRID_SIZE ; i++) {
			autoSize = autoSize + "auto "
		}

		$(".grid-container").css('grid-template-columns', autoSize);

		for (var rows = 0; rows < (GRID_SIZE) ;rows ++){

			for (var columns = 0; columns < (GRID_SIZE) ; columns++) {
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
		//uncoment below to generate colour roomss everywhere :D
		return Math.floor(Math.random()*5);		
	}

	for (var idy = 0 ; idy  <= (GRID_SIZE -1) ; idy++){
		for (var idx = 0 ; idx  <= (GRID_SIZE -1) ; idx++){
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

//moved dictonary out side of the function so its still accessiable to clear
var arrRoomDict =[];
function basicMap(){
	//get center 
	fncGenerateRoomArray();
	var mapCenter = Math.floor(GRID_SIZE / 2);

	// rules
	/*
	pick a blank side of a room
	check if empty
	check if the empty space is touching two rooms 

	check number of rooms to place

	cant create rooms in the first/outer layer of the grid, eg 00 - 09 00,10 to 90, 09 19 29 .. to 99, 09 to 99 

	once all empty rooms have been placed:
	replace one room with tresure
	repalce one room with the exit
	exit must be placed at the end of a corridor eg all 3 sides of the room are blank

	player is then placed on the map atleast 3 rooms away from the exit
	*/


	//find the starting room location, going to use the middle to start with, not sure if i shuld use a lookup table to keep track 
	function AddRoomDict(x, y)
	{
		//id, location [x] [y]
		var room = new Object();
		room.id = arrRoomDict.length;
		room.x = x;
		room.y = y;
		arrRoomDict.push(room);
		//return room;
	}

	function checkSpace(Rx,Ry){
		//Rx Ry is the current room
		//var t,b,l,r,tl,tr,bl,br = 0;
		//for (var Ri = 0;Ri <= 8 ;Ri++){
			for (var i = 0; i <= arrRoomDict.length - 1; i++) {
				arrRooms[arrRoomDict[i].x][arrRoomDict[i].y].roomType = 1;
			}
			//direct attachment
			//top 
			if (arrRooms[(Rx - 1)][Ry].roomType == 1){
				//t = 1;
				console.log("Top");
				return 1;

			}
			//botom
			if (arrRooms[(Rx + 1)][Ry].roomType == 1){
				//b = 1;
				console.log("Bottom");
				return 2;
			}
			//left
			if (arrRooms[(Rx)][Ry - 1].roomType == 1){
				console.log("Left");
				return 3;

			}
			//right
			if (arrRooms[(Rx )][Ry + 1].roomType == 1){
				console.log("Right");
				return 4;

			}
			
			//diagonals
			//top left
			if (arrRooms[(Rx - 1)][Ry - 1].roomType !== 0){
				console.log("Top left");
				return 5;
			}
			//top Right
			if (arrRooms[(Rx - 1)][Ry + 1].roomType !== 0){	
				console.log("Top Right");
				return 6;
			}
			//bottom left
			if (arrRooms[(Rx - 1)][Ry + 1].roomType !== 0){
				console.log("Bottom left");
				return 7;
			}
			//bottom right
			if (arrRooms[(Rx + 1)][Ry + 1].roomType !== 0){
				console.log("Bottom Right");
				return 8;
			}
			return 0;
		//}
				/*
		Checking grid:
		-1-1 |-1,0|-1,+1
		0,-1 |0 ,0|0, +1
		-1,+1|+1,0|+1,+1
	*/
	}
	
	//apply dictionary to main array
	for (var i = 0; i <= arrRoomDict.length - 1; i++) {
				arrRooms[arrRoomDict[i].x][arrRoomDict[i].y].roomType = 1;
			}

	
	var iCount = 0;

	AddRoomDict( mapCenter,mapCenter);


	//recursive funciton to generate rooms
	//run until count is equal to the default plus level
	function Generate(iCount){
		if (iCount == ((DEFAULT_ROOMS + currentLevel) -1 )){
			return;
		}else{
			//pick a room on map via random number of exsisting rooms in arrRoomDict
			//cahnge this to random seed 

			
			//random rooms
			function RollRooms(){


				var randRoomX = Math.floor(Math.random()* arrRooms.length);
				var randRoomY = Math.floor(Math.random()* arrRooms.length);

				if (randRoomX == 0){randRoomX++}
				if (randRoomX == 8){randRoomX--}

				if (randRoomY == 0){randRoomY++}
				if (randRoomY == 8){randRoomY--}
			
				for (var i = 0; i <= arrRoomDict.length - 1; i++) {
					if (arrRoomDict[i].x == randRoomX && arrRoomDict[i].y == randRoomY){
						randRoomX = Math.floor(Math.random()* arrRooms.length);
						randRoomY = Math.floor(Math.random()* arrRooms.length);

						if (randRoomX == 0){randRoomX++}
						if (randRoomX == 8){randRoomX--}
						if (randRoomY == 0){randRoomY++}
						if (randRoomY == 8){randRoomY--}
					}else{
						var randRooms = [randRoomX,randRoomY];
						
					}
					return randRooms;
				}
			}

			var Rroom = RollRooms();
			
			//console.log(randRoomX + ", " + randRoomY)

			var checkResult = checkSpace(Rroom[0], Rroom[1]);

			console.log(Rroom[0], Rroom[1]);
			console.log(checkResult);
			
			



			AddRoomDict(Rroom[0], Rroom[1]);
			$("#" +Rroom[0] + Rroom[1] + ".grid-item").text(iCount);
			//room approch

			//var randRoom = Math.floor(Math.random()* arrRoomDict.length);
			//var checkResult = checkSpace(arrRoomDict[randRoom].x, arrRoomDict[randRoom].y);
			//AddRoomDict( arrRoomDict[randRoom].x,arrRoomDict[randRoom].y);


			//get id and cordinates
			//console.log(iCount);
			
			iCount ++;
			Generate(iCount);
		}

	}

	Generate(iCount);
	//apply dictionary to main array
	for (var i = 0; i <= arrRoomDict.length - 1; i++) {
			arrRooms[arrRoomDict[i].x][arrRoomDict[i].y].roomType = 1;
	}


	//checkSpace(mapCenter,mapCenter);
	//clears room discitonry, might have to disabled depending on how player movent is written
	arrRoomDict = [];
	//draw the map
	fncDrawMap(GRID_SIZE, GRID_SIZE);

}

//only change the display, need it to hold the data in an arry so the map doesnt change 
//https://stackoverflow.com/questions/12583400/javascript-scope-of-nested-for-loop-index
//fixed by adding pramaters for the row and column count
function fncDrawMap(rowCount, columnCount){
	var rooms = roomTypes;
	var roomLength = arrRooms.length;

	for (var idx = 0 ; idx  <= (rowCount - 1); idx++){
		for (var idy = 0 ; idy  <= (columnCount -1); idy++){
			$("#" +idx + idy + ".grid-item").css('backgroundColor', rooms[(arrRooms[idx][idy].roomType)].colour);
			//$("#" +idx + idy + ".grid-item").text(arrRooms[idx][idy].idy + "," + arrRooms[idx][idy].idx);

		}
	}

}