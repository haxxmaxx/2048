// main.js
// containing help functions used in 2048 game
//
// Max Gefvert, max.gefvert@gmail.com, created 2017-11-09



// returns random empty position
function find_empty_pos() {
	var all_empty = [];
	for (var i = 0; i < 16; i++) {
		if (board.tiles[i] == 0) {
			all_empty.push(i);
		}
	}
	return all_empty[Math.round(Math.random()*(all_empty.length-1))];
}

// spawns tile at random empty position, 1 in 10 have value 4
function spawn_tile() {
	// create tile object
	var new_pos = find_empty_pos();
	var tile = {val: Math.random() < 0.9 ? 2 : 4, done: false};
	// add to board array
	board.tiles[new_pos] = tile;
}

// moves if adjecent pos is empty, merges if same value
// if two tiles are merged or can't be moved/merged, done is set to true
// this is to make sure tiles don't merge multiple times per turn
function move_or_merge(i,step) {
	// merge
	if(board.tiles[i].val == board.tiles[i+step].val) {
		var new_val = board.tiles[i].val*2;
		board.tiles[i+step].val = new_val;
		board.tiles[i+step].done = true;
		board.tiles[i] = 0;
		// add the sum of the tiles to the total score
		board.score = board.score + new_val;
		$("#points").text(String(board.score));
	//move
	} else if(board.tiles[i+step] == 0) {
		board.tiles[i+step] = board.tiles[i];
		board.tiles[i] = 0;

	} else {
		board.tiles[i].done = true;
	}
}

// randomizes color for all tiles at window load
function init_random() {
	for (var i = 0; i < 16; i++) {
		var hue = board.hues[Math.round(Math.random()*10)];
		$("#tile-"+i+"").css("background-color","hsl("+hue+", 100%, 70%)");
	}
}

// draws one tile
function draw_tile(i) {
	var val = board.tiles[i].val;
	if(val){
		// sets color according to value, hues stored in board object
		var color = "hsl("+board.hues[Math.log2(val)-1]+", 100%, 70%)";
		$("#tile-"+i+"").css("background-color",color);
	    $("#value-"+i+"").text(val);
	} else {
		$("#tile-"+i+"").css("background-color","hsl(0,0%,90%)");
	    $("#value-"+i+"").text("");
	}
}

// looks for 2048, returns true if found, otherwise false
function is_win() {
	for (var i = 0; i < 16; i++) {
		if(board.tiles[i].val == 2048) {
			return true;
		}
	}
	return false;
}

// ends the game if either won or lost
function end_game() {
	var val_str = "#value-";
	if ((!board.is_legal[119] && !board.is_legal[115] &&
		!board.is_legal[97] && !board.is_legal[100]) || is_win()) {
		// remove values from board
		for (var i = 0; i < 16; i++) {
			$("#value-"+i+"").text("");
		}
		$("#instr").text("PRESS ENTER TO RESTART");
		board.is_running = false;
		// 2048 found = win!
		if (is_win()) {
			$("#value-4").text("2"); $("#value-5").text("0");
			$("#value-6").text("4"); $("#value-7").text("8");
			$("#value-8").text("W"); $("#value-9").text("I");
			$("#value-10").text("N"); $("#value-11").text("!");
		// no possible moves =  game over
		} else {
			for (var i = 0; i < 16; i++) {
				$(val_str.concat(String(i))).text("");
				$("#value-4").text("G"); $("#value-5").text("A");
				$("#value-6").text("M"); $("#value-7").text("E");
				$("#value-8").text("O"); $("#value-9").text("V");
				$("#value-10").text("E"); $("#value-11").text("R");
			}
		}
	}
}

// checks which moves are possible for next move and draws tiles
function turn_update() {
	// reset 
	board.is_legal[119] = false; board.is_legal[115] = false;
	board.is_legal[97] = false; board.is_legal[100] = false;
	// add one tile at empty spot
	spawn_tile();
	for (var i = 0; i < 16; i++) {
		// up
		if(i > 3 && board.tiles[i] != 0 && board.is_legal[119] == false &&
  			(board.tiles[i].val == board.tiles[i-4].val || board.tiles[i-4] == 0)) {
  			board.is_legal[119] = true;
       	}
    	// down
  		if(i < 12 && board.tiles[i] != 0 && board.is_legal[115] == false &&
  			(board.tiles[i].val == board.tiles[i+4].val || board.tiles[i+4] == 0)) {
  			board.is_legal[115] = true;
       	}
       	// left
       	if(i%4 != 0 && board.tiles[i] != 0 && board.is_legal[97] == false &&
  			(board.tiles[i].val == board.tiles[i-1].val || board.tiles[i-1] == 0)) {
  			board.is_legal[97] = true;
       	}
       	// right
       	if(i%4 != 3 && board.tiles[i] != 0 && board.is_legal[100] == false &&
  			(board.tiles[i].val == board.tiles[i+1].val || board.tiles[i+1] == 0)) {
  			board.is_legal[100] = true;
       	}
       	// draw all tiles
		draw_tile(i)
		// resets all tiles
       	board.tiles[i].done = false;
    }
}

///// all functions called from keypress /////
var keypress_functions = [];
// starts new game
keypress_functions[13] = function start_game() {
	board = {
		tiles: Array.apply(null,Array(16)).map(Number.prototype.valueOf,0),
		score: 0,
		hues: [0,30,60,80,120,160,200,230,260,280,310],
		is_legal: [],
		is_running: false
	};
	spawn_tile();
	turn_update();		// also calls spawn_tile => 2 tiles spawned
	$("#instr").text("USE WASD TO MOVE");
	$("#points").text("0");
	board.is_running = true;
}

///// moving funcitons, moves (and merges) all possible tiles /////
// up (w) = 119
keypress_functions[119] = function move_up() {
	for (var k = 1; k <= 3; k++) {
  		for (var i = 4; i < 16; i++) {
  			if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  				move_or_merge(i,-4)
       		}
  		}
	}
}
// down (s) = 115
keypress_functions[115] = function move_down() {
  	for (var i = 11; i > -1; i--) {
  		if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  			move_or_merge(i,4)
       	}
	}
}
// left (a) = 97
keypress_functions[97] = function move_left() {
	for (var i = 1; i < 16; i++) {
		if(i%4 != 0 && board.tiles[i] != 0 && board.tiles[i].done == false) {
			move_or_merge(i,-1)
       	}
	}	
}
// right (d) = 100
keypress_functions[100] = function move_right() {
	for (var i = 14; i > -1; i--) {
		if(i%4 != 3 && board.tiles[i] != 0 && board.tiles[i].done == false) {
			move_or_merge(i,1)
		}
	}	
}