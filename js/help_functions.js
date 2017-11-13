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
	//var tile = {val: Math.random() < 0.9 ? 2 : 4, done: false};
	var tile = {val: 32, done: false};
	// add to board array
	board.tiles[new_pos] = tile;
}

// moves if adjecent pos is empty, merges if same value
function move_or_merge(i,step) {
	if(board.tiles[i].val == board.tiles[i+step].val) {
		var new_val = board.tiles[i].val*2;
		board.tiles[i+step].val = new_val;
		board.score = board.score + new_val;
		$("#points").text(String(board.score));
		board.tiles[i] = 0;
	} else if(board.tiles[i+step] == 0) {
		board.tiles[i+step] = board.tiles[i];
		board.tiles[i] = 0;
	} else {
		board.tiles[i].done = true;
	}
}

// ranodmizes color for all tiles at window load
function init_random() {
	for (var i = 0; i < 16; i++) {
		var color_str = "tile color-";
		var tile_str = "#tile-";
		var val = Math.pow(2, Math.round(Math.random()*10)+1)
		$(tile_str.concat(i)).attr("class",color_str.concat(val));
	console.log(val);
	}
}

// draws one tile
function draw_tile(i) {
	var val = board.tiles[i].val;
	var tile_str = "#tile-";
	var val_str = "#value-";
	var color_str = "tile color-";
	tile_str = tile_str.concat(String(i));
	val_str = val_str.concat(String(i));
	color_str = color_str.concat(val);
	if(val){
		$(tile_str).attr("class",color_str);
       	$(val_str).text(val);
	} else {
		$(tile_str).attr("class","tile");
       	$(val_str).text("");
	}
}

function is_win() {
	for (var i = 0; i < 16; i++) {
		if(board.tiles[i].val == 2048) {
			return true;
		}
	}
	return false;
}

function end_game() {
	var val_str = "#value-";
	// win or looe?
	if ((!board.is_legal[119] && !board.is_legal[115] &&
		!board.is_legal[97] && !board.is_legal[100]) || is_win()) {
		// remove values from board
		for (var i = 0; i < 16; i++) {
			$(val_str.concat(String(i))).text("");
		}
		$("#instr").text("PRESS ENTER TO RESTART");
		board.is_running = false;
		if (is_win()) {
			$("#value-4").text("2"); $("#value-5").text("0");
			$("#value-6").text("4"); $("#value-7").text("8");
			$("#value-8").text("W"); $("#value-9").text("I");
			$("#value-10").text("N"); $("#value-11").text("!");
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
	// add tile at empty spot
	spawn_tile();
	for (var i = 0; i < 16; i++) {
		// up
		if(i > 3 && board.tiles[i] != 0 && board.is_legal[119] == false &&
  			(board.tiles[i].val == board.tiles[i-4].val || board.tiles[i-4] == 0)) {
  			//console.log("up legal");
  			board.is_legal[119] = true;
       	}
    	// down
  		if(i < 12 && board.tiles[i] != 0 && board.is_legal[115] == false &&
  			(board.tiles[i].val == board.tiles[i+4].val || board.tiles[i+4] == 0)) {
  			board.is_legal[115] = true;
  			//console.log("down legal")
       	}
       	// left
       	if(i%4 != 0 && board.tiles[i] != 0 && board.is_legal[97] == false &&
  			(board.tiles[i].val == board.tiles[i-1].val || board.tiles[i-1] == 0)) {
  			board.is_legal[97] = true;
  			//console.log("left legal");
       	}
       	// right
       	if(i%4 != 3 && board.tiles[i] != 0 && board.is_legal[100] == false &&
  			(board.tiles[i].val == board.tiles[i+1].val || board.tiles[i+1] == 0)) {
  			board.is_legal[100] = true;
  			//console.log("right legal")
       	}
       	// resets all tiles
       	board.tiles[i].done = false;
       	// draw all tiles
		draw_tile(i)
    }
}

///// all functions called from keypress /////
var keypress_functions = [];
// starts new game
keypress_functions[13] = function start_game() {
	board = {
		tiles: Array.apply(null,Array(16)).map(Number.prototype.valueOf,0),
		score: 0,
		is_legal: [],
		is_up_legal: false,
		is_down_legal: false,
		is_left_legal: false,
		is_right_legal: false,
		is_running: false
	};
	spawn_tile();
	turn_update();
	$("#instr").text("USE WASD TO MOVE");
	$("#points").text("0");

	board.is_running = true;
}

///// moving funcitons, moves (and merges) all possible tiles /////
// up
keypress_functions[119] = function move_up() {
	for (var k = 1; k <= 3; k++) {
  		for (var i = 4; i < 16; i++) {
  			if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  				move_or_merge(i,-4)
       		}
  		}
	}
}
// up
keypress_functions[115] = function move_down() {
  	for (var i = 11; i > -1; i--) {
  		if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  			move_or_merge(i,4)
       	}
	}
}
// down
keypress_functions[97] = function move_left() {
	for (var i = 1; i < 16; i++) {
		if(i%4 != 0 && board.tiles[i] != 0 && board.tiles[i].done == false) {
			move_or_merge(i,-1)
       	}
	}	
}
// left
keypress_functions[100] = function move_right() {
	for (var i = 14; i > -1; i--) {
		if(i%4 != 3 && board.tiles[i] != 0 && board.tiles[i].done == false) {
			move_or_merge(i,1)
		}
	}	
}