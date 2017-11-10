// merges two tiles, adds sum to score
	function merge(i,step) {
		var new_val = board.tiles[i+step].val*2;
		board.tiles[i+step].val = new_val;
		board.score = board.score + new_val;
		console.log(board.score);
		board.tiles[i] = 0;
	}

	// moves a tile in one direction, sets old posisiton to 0
	function move(i,step) {
		board.tiles[i+step] = board.tiles[i];
		board.tiles[i] = 0;
	}

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

	// spawns tile at random empty position, 1 in X have value 4
function spawn_tile() {
	// create tile object
	var new_pos = find_empty_pos();
	var tile = {val: 2, pos: new_pos, done: false}

	// add to board array
	board.tiles[tile.pos] = tile;
}

	// draws all tiles 
function draw_tile(i) {
	var val = board.tiles[i].val;
	var tile_str = "#tile-";
	var val_str = "#value-";
	if(val){
		$(tile_str.concat(String(i))).css("background-color","green");
       	$(val_str.concat(String(i))).text(val);
	} else {
		$(tile_str.concat(String(i))).css("background-color","red");
       	$(val_str.concat(String(i))).text("");
	}
}

// checks which moves are possible for next move and draws tiles
function turn_update() {
	// reset 
	board.is_legal[119] = false; board.is_legal[115] = false;
	board.is_legal[97] = false; board.is_legal[100] = false;
	//  strings for HTML reference
	var tile_str = "#tile-";
	var val_str = "#value-";
	
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
	spawn_tile();
	spawn_tile();
	turn_update();
}

///// moving funcitons, moves (and merges) all tiles up if possible /////
// up
	keypress_functions[119] = function move_up() {
		for (var k = 1; k <= 3; k++) {
  		for (var i = 4; i < 16; i++) {
  			if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  				if(board.tiles[i].val == board.tiles[i-4].val) {
  				merge(i,-4);
  				} else if(board.tiles[i-4] == 0) {
  					move(i,-4);
  				} else {
  					board.tiles[i].done = true;
  				}
       		}
  		}
		}
	}
	// up
	keypress_functions[115] = function move_down() {
		for (var k = 1; k <= 3; k++) {
  		for (var i = 11; i > -1; i--) {
  			if(board.tiles[i] != 0 && board.tiles[i].done == false) {
  				if(board.tiles[i].val == board.tiles[i+4].val) {
  					merge(i,4);
  				} else if(board.tiles[i+4] == 0) {
  					move(i,4);
  				} else {
  					board.tiles[i].done = true;
  				}
        	}
  		}
  	}
	}
	// down
	keypress_functions[97] = function move_left() {
		for (var k = 1; k <= 3; k++) {
  		for (var i = 1; i < 16; i++) {
  			if(i%4 != 0 && board.tiles[i] != 0 && board.tiles[i].done == false) {
  				if(board.tiles[i].val == board.tiles[i-1].val) {
  					merge(i,-1);
  				} else if(board.tiles[i-1] == 0) {
  					move(i,-1);
  				} else {
  					board.tiles[i].done = true;
  				}
        	}
  		}	
		}
	}
	// left
	keypress_functions[100] = function move_right() {
		for (var k = 1; k <= 3; k++) {
  		for (var i = 14; i > -1; i--) {
  			if(i%4 != 3 && board.tiles[i] != 0 && board.tiles[i].done == false) {
  				if(board.tiles[i].val == board.tiles[i+1].val) {
  					merge(i,1);
  				} else if(board.tiles[i+1] == 0) {
  					move(i,1);
  				} else {
  					board.tiles[i].done = true;
  				}
  			}
  		}	
		}
	}