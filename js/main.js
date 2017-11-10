$(document).ready(function() {

	// global variables
	var board = Array.apply(null,Array(16)).map(Number.prototype.valueOf,0);
	var score = 0;
	var is_up_legal = true;
	var is_down_legal = true;
	var is_left_legal = true;
	var is_right_legal = true;

	// spawn first tiles
	//spawn_tile(); spawn_tile(); draw_tiles();

	// all functions called from keypress
	var keypress_functions = [];
	keypress_functions[13] = function start_game() {
		spawn_tile();
		draw_tiles();
	}

	keypress_functions[119] = function press_up() {
		// try to move three times
 		for (var k = 1; k <= 3; k++) {
			move_up();
		}
	}

	keypress_functions[115] = function press_down() {
		move_down();
	}

	keypress_functions[97] = function press_left() {
		move_left();
	}

	keypress_functions[100] = function press_right() {
		move_right();
	}
	// all legal check functions
	var legal_functions = [];
	legal_functions[119] = function legal_up() {
		is_legal = false;
		for (var i = 4; i < 16; i++) {
	  		if(board[i] != 0 &&
	  			(board[i].val == board[i-4].val || board[i-4] == 0)) {
	  			console.log("legal")
	  			return true;
	       	}
	  	}
	  	console.log("illegal")
	  	return false;
	}

	legal_functions[115] = function legal_down() {
		is_legal = false;
		for (var i = 11; i > -1; i--) {
	  		if(board[i] != 0 &&
	  			(board[i].val == board[i+4].val || board[i+4] == 0)) {
	  			console.log("legal")
	  			return true;
	       	}
	  	}
	  	console.log("illegal")
	  	return false;
	}

	legal_functions[97] = function legal_left() {
		is_legal = false;
		for (var i = 1; i < 16; i++) {
	  		if(i%4 != 0 && board[i] != 0 &&
	  			(board[i].val == board[i-1].val || board[i-1] == 0)) {
	  			console.log("legal")
	  			return true;
	       	}
	  	}
	  	console.log("illegal")
	  	return false;
	}

	legal_functions[100] = function legal_left() {
		is_legal = false;
		for (var i = 14; i > -1; i--) {
	  		if(i%4 != 3 && board[i] != 0 &&
	  			(board[i].val == board[i+1].val || board[i+1] == 0)) {
	  			console.log("legal")
	  			return true;
	       	}
	  	}
	  	console.log("illegal")
	  	return false;
	}

  	// moves (and merges) all tiles once up if possible 
  	function move_up() {
	  	for (var i = 4; i < 16; i++) {
	  		if(board[i] != 0 && board[i].done == false) {
	  			if(board[i].val == board[i-4].val) {
	  			merge(i,-4);
	  			} else if(board[i-4] == 0) {
	  				move(i,-4);
	  			} else {
	  				board[i].done = true;
	  			}
	       	}
	  	}
  	}

  	// moves (and merges) all tiles once up if possible 
  	function move_down() {
  		for (var k = 1; k < 4; k++) {
	  		for (var i = 11; i > -1; i--) {
	  			if(board[i] != 0 && board[i].done == false) {
	  				if(board[i].val == board[i+4].val) {
	  					merge(i,4);
	  				} else if(board[i+4] == 0) {
	  					move(i,4);
	  				} else {
	  					board[i].done = true;
	  				}
	        	}
	  		}
	  	}
  	}

  	// moves (or merges) all tiles once left if possible 
  	function move_left() {
  		for (var k = 1; k < 4; k++) {
	  		for (var i = 1; i < 16; i++) {
	  			if(i%4 != 0 && board[i] != 0 && board[i].done == false) {
	  				if(board[i].val == board[i-1].val) {
	  					merge(i,-1);
	  				} else if(board[i-1] == 0) {
	  					move(i,-1);
	  				}
	        	}
	  		}	
  		}
  	}

  	// moves (or merges) all tiles once right if possible 
  	function move_right() {
  		for (var k = 1; k < 4; k++) {
	  		for (var i = 14; i > -1; i--) {
	  			if(i%4 != 3 && board[i] != 0 && board[i].done == false) {
	  				if(board[i].val == board[i+1].val) {
	  					merge(i,1);
	  				} else if(board[i+1] == 0) {
	  					move(i,1);
	  				}
	        	}
	  		}	
  		}
  	}

  	function merge(i,step) {
  		var new_val = board[i+step].val*2;
  		board[i+step].val = new_val;
  		score = score + new_val;
  		console.log(score);
  		board[i] = 0;
  	}

  	function move(i,step) {
  		board[i+step] = board[i];
  		board[i] = 0;
  	}

  	// cathes keypress
	$(document).keypress(start_turn);

	// draws all tiles 
	function draw_tiles() {
		var tile_str = "#tile-";
		var val_str = "#value-"
		for (var i = 0; i < 16; i++) {
			board[i].done = false;
			var val = board[i].val;
			if(val){
				$(tile_str.concat(String(i))).css("background-color","green");
	        	$(val_str.concat(String(i))).text(val);
			} else {
				$(tile_str.concat(String(i))).css("background-color","red");
	        	$(val_str.concat(String(i))).text("");
			}
		}
	}

	// spawns tile at random empty position, 1 in X have value 4
	function spawn_tile() {
		// create tile object
		var new_pos = find_empty_pos();
		var tile = {val: 2, pos: new_pos, done: false}

		// add to board array
		board[tile.pos] = tile;
	}

	// calls function cooresponging to key
  	function start_turn(event) {
  		if(event.which == 13) {
  			keypress_functions[event.which].call();
  		}
 		if (legal_functions[event.which] &&
 			legal_functions[event.which].call()) {
    		keypress_functions[event.which].call();
    		spawn_tile();
			draw_tiles();
			// if (!find_empty_pos())
			// 	console.log("GAME OVER")
    	}
  	}

  	// returns random empty position
  	function find_empty_pos() {
  		var all_empty = [];
  		for (var i = 0; i < 16; i++) {
  			if (board[i] == 0) {
  				all_empty.push(i);
  			}
  		}
  		return all_empty[Math.round(Math.random()*(all_empty.length-1))];
  	}

});
